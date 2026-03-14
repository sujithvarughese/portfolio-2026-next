import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    if (!process.env.VECTOR_STORE_ID) {
      return NextResponse.json(
        { error: 'VECTOR_STORE_ID environment variable is required' },
        { status: 500 }
      );
    }

    const openaiStream = openai.responses.stream({
      model: 'gpt-4.1-mini',
      instructions: process.env.OPENAI_PROMPT,
      tools: [
        {
          type: 'file_search',
          vector_store_ids: [process.env.VECTOR_STORE_ID],
          max_num_results: 2,
        },
      ],
      input: query,
    });
    // Create a streaming response
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of openaiStream) {
            if (event.type === 'response.output_text.delta') {
              const data = JSON.stringify({ delta: event.delta });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }

          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'An error occurred during your request.' },
      { status: 500 }
    );
  }
}
import OpenAI from 'openai';
import type { ResponseInputItem } from 'openai/resources/responses/responses';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { history } = await request.json();

    if (!history || !Array.isArray(history) || history.length === 0) {
      return NextResponse.json(
        { error: 'Chat history is required' },
        { status: 400 }
      );
    }

    if (!process.env.VECTOR_STORE_ID) {
      return NextResponse.json(
        { error: 'VECTOR_STORE_ID environment variable is required' },
        { status: 500 }
      );
    }

    const input: ResponseInputItem[] = history.map((msg: any) => ({
      role: msg.sender === 'user' ? ('user' as const) : ('assistant' as const),
      content: msg.message,
    }));

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
      input: input,
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
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

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

    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      instructions:
        'You are a helpful chatbot for a portfolio website that answers questions about Sujith Varughese’s professional background only. Keep responses under 50 words. If asked about unrelated personal topics, politely say you only handle professional information. Use light humor when appropriate.',
      tools: [
        {
          type: 'file_search',
          vector_store_ids: [process.env.VECTOR_STORE_ID],
          max_num_results: 10,
        },
      ],
      input: query,
    });
    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        // Split the response into chunks for streaming effect
        const words = response.output_text.split(' ');
        let currentChunk = '';

        const sendChunk = (index: number) => {
          if (index >= words.length) {
            controller.close();
            return;
          }

          currentChunk = words[index] + ' ';
          const data = JSON.stringify({ delta: currentChunk });
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));

          // Add a small delay to simulate streaming
          setTimeout(() => sendChunk(index + 1), 50);
        };

        sendChunk(0);
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
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
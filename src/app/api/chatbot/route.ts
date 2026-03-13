import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fastPaths = [
  {
    match: ['tech stack', 'technologies', 'stack', 'what does sujith use'],
    answer:
      'Sujith primarily works with React, TypeScript, Node.js, NestJS, Firebase, MongoDB, Google Cloud, AWS, and OpenAI APIs.',
  },
  {
    match: ['open to work', 'available for work', 'hiring', 'looking for work'],
    answer:
      'Yes — Sujith is open to software engineering opportunities focused on full-stack development, scalable systems, and AI-enabled products.',
  },
  {
    match: ['who is sujith', 'tell me about sujith', 'what kind of developer', 'introduce sujith'],
    answer:
      'Sujith is a full-stack software engineer who builds scalable SaaS platforms and AI-powered applications, with experience across React, TypeScript, backend services, and cloud infrastructure.',
  },
  {
    match: ['medscope'],
    answer:
      'MedScope is a health-focused app Sujith built to help users explore medications, medical conditions, symptom-based insights, and health utilities like BMI calculations. It uses React, React Native, TypeScript, and OpenAI-powered features.',
  },
  {
    match: ['authentime'],
    answer:
      'Authentime is an AI-powered application designed to help authenticate luxury watches using image analysis. It was built with TypeScript and Next.js and focuses on trust for buyers, sellers, and collectors.',
  },
  {
    match: ['leasewise'],
    answer:
      'LeaseWise is a property management platform Sujith built to streamline rental operations, financial tracking, and market-data access for real estate workflows.',
  },
];

const getFastPathAnswer = (query: string) => {
  const q = query.toLowerCase().trim();

  for (const item of fastPaths) {
    if (item.match.some((phrase) => q.includes(phrase))) {
      return item.answer;
    }
  }
  return null;
}

const createSseStreamFromText = (text: string) => {
  const encoder = new TextEncoder();

  return new ReadableStream({
    start(controller) {
      const data = JSON.stringify({ delta: text });
      controller.enqueue(encoder.encode(`data: ${data}\n\n`));
      controller.close();
    },
  });
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const fastAnswer = getFastPathAnswer(query);
    if (fastAnswer) {
      return new Response(createSseStreamFromText(fastAnswer), {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      });
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
import OpenAI from 'openai';
import { NextResponse } from 'next/server';
//import { OpenAIStream, StreamingTextResponse,  } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
})

export async function POST (request: Request) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        {error: "Query is required"},
        {status: 400}
      );
    }
    if (!process.env.VECTOR_STORE_ID) {
      return NextResponse.json(
        { error: "VECTOR_STORE_ID environment variable is required" },
        { status: 500 }
      );
    }
    const response = await openai.responses.create({
        model: "gpt-4.1-mini",
        instructions: "You are a helpful chatbot for a portfolio website to help users get facts about the subject, Sujith Varughese. Responses should be no more than 50 words. If asked a question not related to his professional experience, politely explained that you are trained to give information about his professional information only. Do not mention that the information is not mentioned in the documents. Use light humor when needed.",
        tools: [{
          type: "file_search",
          vector_store_ids: [process.env.VECTOR_STORE_ID as string],
          max_num_results: 10
        }],
        input: query,
        stream: true,
      })
    console.log(response)
    //const stream = OpenAIStream(response)
    //return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred during your request.' })
  }

}
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {NextResponse} from "next/server";

const initialState = {
  loading: false,
  chat: [{
    sender: "chatbot",
    message: 'Hello! I am your personal AI chatbot to answer any questions you may have about Sujith. Try asking a question like "What are some of Sujith\'s recent projects?", or "What programming languages is Sujith skilled in?"'
  }]
}

const chatbotSlice = createSlice({
  name: "assistant",
  initialState,
  reducers: {
    addMessageToChat: (state, action) => {
      state.loading = false
      state.chat.push({ sender: action.payload.sender, message: action.payload.message })
    },
    addAiStream: (state, action) => {
      state.chat[state.chat.length - 1].message += action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchAiStream.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(fetchAiStream.rejected, (state) => {
      state.loading = false
      console.log("Failed to fetch response")
    })
    builder.addCase(fetchAiStream.pending, (state) => {
      state.loading = true
    })
  }
})

export const fetchAiStream = createAsyncThunk('chatbot/fetchAiStream', async (query, thunkAPI) => {
  try {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPEN_AI_KEY}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 0 }
    });
    if (!response) {
      console.log("No response")
      return
    }
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let result = '';
    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      const chunkStr = decoder.decode(value);
      chunkStr.split("\n").forEach(line => {
        if (line.startsWith("data")) {
          try {
            const data = JSON.parse(line.replace("data: ", ""));
            if (data.delta) {
              if (!result) {
                thunkAPI.dispatch(addMessageToChat({ sender: "chatbot", message: result }))
              }
              result += data.delta
              thunkAPI.dispatch(addAiStream(data.delta))
            }
          } catch (error) {
            console.error('Error:', error);
            return NextResponse.json({ error: 'An error occurred while streaming response.' })
          }
        }
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred on the client.' })
  }
})


export default chatbotSlice.reducer
export const { addMessageToChat, addAiStream} = chatbotSlice.actions
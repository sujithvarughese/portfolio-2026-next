import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

type ChatMessage = {
  sender: "chatbot" | "user";
  message: string;
};

type ChatState = {
  loading: boolean;
  chat: ChatMessage[];
};


const initialState: ChatState = {
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
    addMessageToChat: (state, action: PayloadAction<{ sender: "chatbot" | "user"; message: string }>) => {
      state.loading = false
      state.chat.push(action.payload)
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
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    // create empty bot message immediately
    thunkAPI.dispatch(addMessageToChat({ sender: "chatbot", message: "" }))

    let buffer = '';

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;

      const chunkStr = decoder.decode(value, { stream: true });

      chunkStr.split("\n").forEach(line => {
        if (line.startsWith("data:")) {
          try {
            const data = JSON.parse(line.replace("data: ", ""));
            if (data.delta) {
              buffer += data.delta;
            }
          } catch (error) {
            console.error('Error while parsing stream:', error);
          }
        }
      });

      // dispatch buffered text in bigger chunks
      if (buffer) {
        thunkAPI.dispatch(addAiStream(buffer));
        buffer = '';
      }
    }

    // flush any remaining text
    if (buffer) {
      thunkAPI.dispatch(addAiStream(buffer));
    }
  } catch (error) {
    console.error('Error:', error);
    throw error; // This will trigger the rejected case
  }
})


export default chatbotSlice.reducer
export const { addMessageToChat, addAiStream} = chatbotSlice.actions
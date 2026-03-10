"use client"
import Hero from "@/components/Hero";
import { useForm } from '@mantine/form';
import { addMessageToChat, fetchAiStream } from "@/lib/features/chatbot/chatbotSlice";
import { useDisclosure } from "@mantine/hooks";
import { useAppDispatch } from "@/lib/hooks";
import { Navbar } from "@/components/Navbar";
import { ChatbotDrawer } from "@/components/chatbot/ChatbotDrawer";
import ChatbotButton from "@/components/chatbot/ChatbotButton";
import { Box, Flex } from "@mantine/core";


export default function Home() {

  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useAppDispatch()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      query: '',
    }
  });

  const handleSubmit = async (query: string) => {
    if (!query) {
      return
    }
    if (!opened) {
      open()
    }
    dispatch(addMessageToChat({ sender: "user", message: query}))
    dispatch(fetchAiStream(query as any))
    form.reset()
  }


  return (
    <Box 
      className="font-sans items-center" 
      style={{ 
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}
    >
      <Navbar openAI={open} />

      <Box
        style={{ 
          flex: 1,
          width: '100%'
        }}
      >
        <Hero form={form} handleSubmit={async () => handleSubmit(form.getValues().query)} openDrawer={open}/>
      </Box>

      <footer className="row-start-3 gap-[24px] flex-wrap items-center justify-center hidden md:flex">

      </footer>

      {/* Floating AI Button for mobile screens only */}
      {!opened && (
        <Box
          className="block md:hidden"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000
          }}
        >
          <ChatbotButton open={open} />
        </Box>
      )}

      <ChatbotDrawer opened={opened} close={close} form={form} handleSubmit={handleSubmit} />
    </Box>
  );
}

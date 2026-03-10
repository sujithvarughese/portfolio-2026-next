"use client"
import { useForm } from '@mantine/form';
import { addMessageToChat, fetchAiStream } from "@/lib/features/chatbot/chatbotSlice";
import { useDisclosure } from "@mantine/hooks";
import { useAppDispatch } from "@/lib/hooks";
import { Navbar } from "@/components/Navbar";
import Projects from "@/components/Projects";
import { ChatbotDrawer } from "@/components/chatbot/ChatbotDrawer";
import ChatbotButton from "@/components/chatbot/ChatbotButton";
import { Box, Flex } from "@mantine/core";

export default function ProjectsPage() {
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
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        paddingTop: '80px'
      }}
    >
      <Navbar openAI={open} />

      <Box
        maw={1400} 
        m="auto"
        style={{ position: 'relative' }}
      >
        <Flex justify="center" align="center" style={{ minHeight: 'calc(100vh - 80px)', padding: '20px' }}>
          <Box
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '16px',
              padding: '40px',
              maxWidth: '95%',
              width: '100%',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Projects />
          </Box>
        </Flex>

        {/* Floating AI Button for all screens */}
        {!opened && (
          <Box
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              zIndex: 1000
            }}
          >
            <ChatbotButton open={open} />
          </Box>
        )}
      </Box>

      <ChatbotDrawer opened={opened} close={close} form={form} handleSubmit={handleSubmit} />
    </Box>
  );
}

"use client"
import {Drawer, Button, Title, Flex, Box, TextInput} from '@mantine/core';
import {useAppSelector} from "@/lib/hooks";
import {useEffect, useRef} from "react";
import Message from "@/components/chatbot/Message";
import LoadingMessage from "@/components/chatbot/LoadingMessage";
import {IoIosSend} from "react-icons/io";
import { RiAiGenerate2 } from "react-icons/ri";
import { UseFormReturnType } from '@mantine/form';

interface FormValues {
  query: string;
}

interface ChatMessage {
  sender: 'user' | 'assistant' | 'chatbot';
  message: string;
}

type ChatbotProps = {
  opened: boolean;
  close: () => void;
  form: UseFormReturnType<FormValues>;
  handleSubmit: (query: string) => void;
};

export function ChatbotDrawer({ opened, close, form, handleSubmit }: ChatbotProps) {

  const chat = useAppSelector(state => state.assistant.chat) as ChatMessage[]
  const loading = useAppSelector(state => state.assistant.loading)

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef?.current) {
      bottomRef.current!.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  // Hide main page scrollbar and prevent scrolling when chatbot drawer is open
  useEffect(() => {
    if (opened) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [opened]);

  return (
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Flex align="center" gap={8}>
            <Box
              style={{
                background: 'linear-gradient(135deg, #FF8A00, #FF6B00)',
                borderRadius: '50%',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <RiAiGenerate2 size={18} color="white" />
            </Box>
            <Title
              order={3}
              style={{
                background: 'linear-gradient(135deg, #228be6, #339af0)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 600,
                fontSize: '1.25rem'
              }}
            >
              AI Assistant
            </Title>
          </Flex>
        }
        position="right"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Flex direction="column" gap={20}>
          <Box>
            {chat?.map((message, index) => <Message key={index} {...message} />)}
            {loading && <LoadingMessage />}
          </Box>
          <Suggestions onSelect={handleSubmit} />
          <form onSubmit={form.onSubmit((values: FormValues) => handleSubmit(values.query))}>
            <Flex direction="column" gap={20}>
              <Box mx={12}>
                <TextInput
                  data-autofocus
                  placeholder="Create Message"
                  key={form.key('query')}
                  {...form.getInputProps('query')}
                />
              </Box>

              <Flex justify="flex-end" mx={12} ref={bottomRef}>
                <Button
                  type="submit"
                  loading={loading}
                  variant="gradient"
                  loaderProps={{ type: 'dots' }}
                  rightSection={<IoIosSend size={20}/>}
                >Send
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Drawer>
  );
}

const Suggestions = ({ onSelect }) => {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginTop: "10px"
    }}>
      {suggestedQuestions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          style={{
            padding: "6px 12px",
            borderRadius: "20px",
            border: "1px solid #ddd",
            background: "#f7f7f7",
            cursor: "pointer",
            fontSize: "13px"
          }}
        >
          {q}
        </button>
      ))}
    </div>
  );
}

const suggestedQuestions = [
  "Tell me about Sujith",
  "What tech stack does he use?",
  "What did he build at AllClear?",
  "What AI projects has he built?",
  "What are some of his recent projects?",
  "Does Sujith have SaaS experience?",
  "Is Sujith open to work?"
];

"use client"
import {Drawer, Button, Title, Flex, Box, TextInput} from '@mantine/core';
import {useAppSelector} from "@/lib/hooks";
import {useEffect, useRef, useState} from "react";
import Message from "@/components/chatbot/Message";
import LoadingMessage from "@/components/chatbot/LoadingMessage";
import {IoIosSend} from "react-icons/io";
import { RiAiGenerate2 } from "react-icons/ri";
import { UseFormReturnType } from '@mantine/form';
import {PlaceholdersAndVanishInput} from "@/components/ui/placeholders-and-vanish-input";

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

  const [inputValue, setInputValue] = useState("");
  const isLoading = useAppSelector(state => state.assistant.loading)
  const chat = useAppSelector(state => state.assistant.chat) as ChatMessage[]
  const loading = useAppSelector(state => state.assistant.loading)

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    if (opened) {
      // Multiple attempts to ensure scroll happens after drawer opens
      const scrollToBottom = () => {
        if (bottomRef?.current) {
          bottomRef.current.scrollIntoView({ behavior: "auto", block: "end" });
        }
      };

      // Immediate scroll
      scrollToBottom();

      // Scroll after drawer starts opening
      const timeout1 = setTimeout(scrollToBottom, 100);

      // Scroll after drawer animation completes
      const timeout2 = setTimeout(scrollToBottom, 300);

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [opened, isLoading]);

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
        zIndex={1000000}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Flex direction="column" gap={20}>
          <Box>
            {chat?.map((message, index) => <Message key={index} {...message} />)}
            {loading && <LoadingMessage />}

          </Box>


            <Flex direction="column" gap={20}>
              <Box mx={12}>
                <PlaceholdersAndVanishInput placeholders={suggestedQuestions} onChange={handleChange} onSubmit={onSubmit} hero={false} />
              </Box>
            </Flex>

        </Flex>
        <div ref={bottomRef} style={{ height: '16px' }}/>
      </Drawer>
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

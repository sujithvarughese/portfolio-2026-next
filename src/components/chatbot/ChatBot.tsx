"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Paper,
  TextInput,
  Button,
  Stack,
  Text,
  Group,
  Avatar,
  ScrollArea,
  ActionIcon,
  Loader,
} from "@mantine/core";
import {
  IconSend,
  IconRobot,
  IconUser,
  IconX,
  IconMessageCircle,
} from "@tabler/icons-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBotProps {
  onClose: () => void;
}

const ChatBot = ({ onClose }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm here to help you learn more about Sujith's professional background. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      let botResponse = "";
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.delta) {
                botResponse += data.delta;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessage.id
                      ? { ...msg, content: botResponse }
                      : msg
                  )
                );
              }
            } catch (error) {
              console.error("Error parsing SSE data:", error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "Sorry, I'm having trouble responding right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <Paper
        shadow="xl"
        radius="lg"
        className="w-96 h-[500px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <Group justify="space-between" p="md" className="border-b border-gray-200 dark:border-gray-700">
          <Group gap="sm">
            <Avatar size="sm" color="blue">
              <IconRobot size={16} />
            </Avatar>
            <div>
              <Text size="sm" fw={600}>
                Portfolio Assistant
              </Text>
              <Text size="xs" c="dimmed">
                Ask about Sujith's work
              </Text>
            </div>
          </Group>
          <ActionIcon
            variant="subtle"
            color="gray"
            onClick={onClose}
            aria-label="Close chat"
          >
            <IconX size={16} />
          </ActionIcon>
        </Group>

        {/* Messages */}
        <ScrollArea
          h={350}
          p="md"
          viewportRef={scrollAreaRef}
          className="flex-1"
        >
          <Stack gap="md">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Group
                  gap="sm"
                  align="flex-start"
                  className={`max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar
                    size="sm"
                    color={message.sender === "user" ? "blue" : "gray"}
                  >
                    {message.sender === "user" ? (
                      <IconUser size={16} />
                    ) : (
                      <IconRobot size={16} />
                    )}
                  </Avatar>
                  <Paper
                    p="sm"
                    radius="lg"
                    className={`${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    <Text size="sm">{message.content}</Text>
                  </Paper>
                </Group>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <Group gap="sm" align="flex-start">
                  <Avatar size="sm" color="gray">
                    <IconRobot size={16} />
                  </Avatar>
                  <Paper
                    p="sm"
                    radius="lg"
                    className="bg-gray-100 dark:bg-gray-700"
                  >
                    <Loader size="sm" />
                  </Paper>
                </Group>
              </motion.div>
            )}
          </Stack>
        </ScrollArea>

        {/* Input */}
        <Group gap="sm" p="md" className="border-t border-gray-200 dark:border-gray-700">
          <TextInput
            placeholder="Ask about experience, skills, projects..."
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            flex={1}
            radius="xl"
          />
          <ActionIcon
            size="lg"
            radius="xl"
            variant="filled"
            color="blue"
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            <IconSend size={16} />
          </ActionIcon>
        </Group>
      </Paper>
    </motion.div>
  );
};

export default ChatBot;

"use client";

import { motion } from "motion/react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconMessageCircle } from "@tabler/icons-react";

interface ChatBotToggleProps {
  onClick: () => void;
}

const ChatBotToggle = ({ onClick }: ChatBotToggleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 z-40"
    >
      <Tooltip label="Ask about Sujith's work" position="left">
        <ActionIcon
          size="xl"
          radius="xl"
          variant="filled"
          color="blue"
          onClick={onClick}
          className="shadow-lg hover:shadow-xl transition-shadow duration-300"
          aria-label="Open chat"
        >
          <IconMessageCircle size={24} />
        </ActionIcon>
      </Tooltip>

      {/* Pulse animation */}
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-500 opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default ChatBotToggle;

"use client"
import { Box, Text } from '@mantine/core'
import { RiAiGenerate2 } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  sender: 'user' | 'assistant' | 'chatbot';
  message: string;
}

const Message = ({ sender, message }: MessageProps) => {
  const isUser = sender === 'user';

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: '12px',
        margin: '16px 0',
        padding: '0 12px'
      }}
    >
      <Box
        style={{
          background: isUser 
            ? 'linear-gradient(135deg, #228be6, #339af0)' 
            : 'linear-gradient(135deg, #FF8A00, #FF6B00)',
          borderRadius: '50%',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '32px',
          height: '32px'
        }}
      >
        {isUser ? <FaUser size={14} color="white" /> : <RiAiGenerate2 size={14} color="white" />}
      </Box>

      <Box
        className={isUser ? "bubble-user" : "bubble-assistant"}
        style={{
          background: isUser 
            ? 'linear-gradient(135deg, #e3f2fd, #bbdefb)' 
            : 'linear-gradient(60deg, #fff3e0, #ffe0b2)',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          padding: '12px 16px',
          maxWidth: '75%',
          wordBreak: 'break-word',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: isUser 
            ? '1px solid rgba(34, 139, 230, 0.2)' 
            : '1px solid rgba(255, 138, 0, 0.2)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Text
          size="sm"
          style={{
            color: '#333',
            lineHeight: 1.5,
            fontSize: '0.95rem',
          }}
          className="prose prose-sm max-w-none"
        >
          <ReactMarkdown>{message}</ReactMarkdown>
        </Text>
      </Box>
    </Box>
  );
};

export default Message;

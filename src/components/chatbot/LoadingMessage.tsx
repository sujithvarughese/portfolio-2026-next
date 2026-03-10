"use client"
import { Box, Loader } from '@mantine/core'
import { RiAiGenerate2 } from "react-icons/ri";

const LoadingMessage = () => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '12px',
        margin: '16px 0',
        padding: '0 12px'
      }}
    >
      <Box
        style={{
          background: 'linear-gradient(135deg, #FF8A00, #FF6B00)',
          borderRadius: '50%',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '32px',
          height: '32px'
        }}
      >
        <RiAiGenerate2 size={14} color="white" />
      </Box>

      <Box
        style={{
          background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
          borderRadius: '16px',
          padding: '12px 16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 138, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <Loader size="sm" color="orange" />
      </Box>
    </Box>
  );
};

export default LoadingMessage;

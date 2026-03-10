"use client"
import { Button } from '@mantine/core'
import { RiAiGenerate2 } from "react-icons/ri";

type ChatbotButtonProps = {
  open: () => void
  isScrolled?: boolean
}

const ChatbotButton = ({ open, isScrolled = false }: ChatbotButtonProps) => {
  return (
    <Button
      onClick={open}
      variant="gradient"
      gradient={{ from: '#FF8A00', to: '#FF6B00', deg: 135 }}
      size={isScrolled ? "md" : "lg"}
      radius="xl"
      leftSection={<RiAiGenerate2 size={isScrolled ? 16 : 20} />}
      style={{
        boxShadow: '0 4px 15px rgba(255, 138, 0, 0.3)',
        border: 'none',
        fontWeight: 600,
        fontSize: isScrolled ? '0.875rem' : '1rem',
        padding: isScrolled ? '8px 16px' : '12px 20px',
        animation: 'pulse 2s infinite',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(255, 138, 0, 0.4)',
            transition: 'all 0.3s ease'
          }
        }
      }}
    >
      Ask AI
    </Button>
  )
}

export default ChatbotButton

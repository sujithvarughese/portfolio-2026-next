"use client"
import React from 'react'
import { Box, Button, Flex, Text } from '@mantine/core'
import { fullName } from '@/data/data'
import { useRouter, usePathname } from 'next/navigation'
import ChatbotButton from '@/sections/chatbot/ChatbotButton'

  interface NavbarProps {
  openAI?: () => void;
  }

  export const Navbar = ({ openAI }: NavbarProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Experience', href: '/experience' },
    { label: 'Projects', href: '/projects' }
  ]

  return (
    <Box
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '50px',
        padding: '12px 24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Flex align="center" justify="center" gap="lg">
        <Text 
          size="lg" 
          fw={600}
          style={{
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            fontFamily: 'Space Grotesk, sans-serif',
            cursor: 'pointer'
          }}
          onClick={() => router.push('/')}
          className="hidden md:block"
        >
          {fullName}
        </Text>

        <Box
          style={{
            height: '20px',
            width: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
          }}
          className="hidden md:block"
        />

        <Flex gap="sm">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? 'filled' : 'subtle'}
              size="sm"
              radius="xl"
              onClick={() => router.push(item.href)}
              style={{
                backgroundColor: pathname === item.href 
                  ? 'rgba(34, 139, 230, 0.8)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: pathname === item.href 
                  ? '1px solid rgba(34, 139, 230, 0.6)' 
                  : '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500
              }}
              styles={{
                root: {
                  '&:hover': {
                    backgroundColor: pathname === item.href 
                      ? 'rgba(34, 139, 230, 0.9)' 
                      : 'rgba(255, 255, 255, 0.2)',
                  }
                }
              }}
            >
              {item.label}
            </Button>
          ))}
        </Flex>

        {openAI && (
          <>
            <Box
              style={{
                height: '20px',
                width: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)'
              }}
              className="hidden md:block"
            />
            <Box className="hidden md:block">
              <ChatbotButton open={openAI} />
            </Box>
          </>
        )}
      </Flex>
    </Box>
  )
}

"use client"
import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, Text } from '@mantine/core'
import { fullName } from '@/data/data'
import { useRouter, usePathname } from 'next/navigation'
import ChatbotButton from '@/components/chatbot/ChatbotButton'
import { motion } from "motion/react"

interface NavbarProps {
  openAI?: () => void;
}

export const Navbar = ({ openAI }: NavbarProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollingDown = currentScrollY > lastScrollY

      if (scrollingDown && currentScrollY > 50) {
        setIsScrolled(true)
      } else if (!scrollingDown || currentScrollY <= 50) {
        setIsScrolled(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMounted])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Experience', href: '/experience' },
    { label: 'Projects', href: '/projects' }
  ]

  return (
    <Box
      style={{
        position: 'fixed',
        top: isMounted && isScrolled ? '8px' : '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '50px',
        padding: isMounted && isScrolled ? '8px 20px' : '12px 24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <Flex align="center" justify="center" gap="lg">
        <Text 
          size={isMounted && isScrolled ? "md" : "lg"}
          fw={600}
          style={{
            color: 'white',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.9)',
            fontFamily: 'Space Grotesk, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
          onClick={() => router.push('/')}
          className="hidden md:block hover:text-blue-200 hover:scale-105"
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
            <motion.div
              key={item.href}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0,
                transition: { duration: 0.1 }
              }}
            >
              <Button
                variant={pathname === item.href ? 'filled' : 'subtle'}
                size={isMounted && isScrolled ? "xs" : "sm"}
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
                  fontWeight: 500,
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8), 0 0 1px rgba(0, 0, 0, 0.9)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
                styles={{
                  root: {
                    '&:hover': {
                      backgroundColor: pathname === item.href 
                        ? 'rgba(34, 139, 230, 0.95)' 
                        : 'rgba(255, 255, 255, 0.25)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                      border: pathname === item.href 
                        ? '1px solid rgba(34, 139, 230, 0.8)' 
                        : '1px solid rgba(255, 255, 255, 0.4)'
                    }
                  }
                }}
              >
                {item.label}
              </Button>
            </motion.div>
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
            <motion.div
              className="hidden md:block"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                y: 0,
                transition: { duration: 0.1 }
              }}
            >
              <ChatbotButton open={openAI} isScrolled={isMounted && isScrolled} />
            </motion.div>
          </>
        )}
      </Flex>
    </Box>
  )
}

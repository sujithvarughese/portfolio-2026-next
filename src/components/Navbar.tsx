"use client"
import React, { useState, useEffect } from 'react'
import { Box, Button, Flex, Text, Drawer, Anchor, Stack, ActionIcon } from '@mantine/core'
import { IconMenu2 } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
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
  const [mobileMenuOpened, { open: openMobileMenu, close: closeMobileMenu }] = useDisclosure(false)

  const emailAddress = "sujith.varug@gmail.com"

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
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
      p={{ base: isMounted && isScrolled ? '8px 20px' : '12px 12px', sm: isMounted && isScrolled ? '8px 20px' : '12px 24px' }}
    >
      <Box style={{ position: 'relative', width: '100%' }}>
        {/* Original Centered Layout - works for both mobile and desktop */}
        <Flex align="center" justify="center" gap={{ base: "xs", md: "lg"}}>
          <ActionIcon
            onClick={openMobileMenu}
            variant="subtle"
            size="lg"
            className="block md:hidden"
            display={{ base: 'block', sm: 'none' }}
            style={{
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <IconMenu2 size={20} />
          </ActionIcon>
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

          <Flex gap={{ base: "xs", md: "sm" }}>
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

      {/* Mobile Navigation Drawer */}
      <Drawer
        opened={mobileMenuOpened}
        onClose={closeMobileMenu}
        position="left"
        size="75%"
        styles={{
          content: {
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          },
          header: {
            background: 'transparent',
            borderBottom: 'none',
          },
          title: {
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 600,
            fontFamily: 'Space Grotesk, sans-serif',
          },
          close: {
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }
          }
        }}
        title={fullName}
      >
        <Stack gap="lg" style={{ padding: '20px 0' }}>
          {/* Navigation Links */}
          <Box>
            <Text 
              size="lg" 
              fw={600} 
              mb="md"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Space Grotesk, sans-serif'
              }}
            >
              Navigation
            </Text>
            <Stack gap="xs">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? 'filled' : 'subtle'}
                  size="lg"
                  radius="md"
                  onClick={() => {
                    router.push(item.href)
                    closeMobileMenu()
                  }}
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
                    justifyContent: 'flex-start',
                    width: '100%'
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Certificates & Education */}
          <Box>
            <Text 
              size="lg" 
              fw={600} 
              mb="md"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Space Grotesk, sans-serif'
              }}
            >
              Certificates & Education
            </Text>
            <Stack gap="xs">
              <Anchor 
                href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718361/diploma_mv2evg.png" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: '#60a5fa',
                  fontSize: '16px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}
              >
                Bachelor's Diploma
              </Anchor>
              <Anchor 
                href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747725035/CompTIA_A_ce_certificate_tfbzb8.png" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: '#60a5fa',
                  fontSize: '16px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}
              >
                CompTIA A+
              </Anchor>
              <Anchor 
                href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747725095/Meta_front_end_certificate-_Coursera_eeuipu.png" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: '#60a5fa',
                  fontSize: '16px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}
              >
                Meta Front End Developer
              </Anchor>
              <Anchor 
                href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718364/accounting_certificate_ff7vvg.png" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: '#60a5fa',
                  fontSize: '16px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}
              >
                Accounting Technology
              </Anchor>
              <Anchor 
                href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718364/business_management_cert_kmza3i.png" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: '#60a5fa',
                  fontSize: '16px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}
              >
                Business Management
              </Anchor>
            </Stack>
          </Box>

          {/* Professional Links */}
          <Box>
            <Text 
              size="lg" 
              fw={600} 
              mb="md"
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'Space Grotesk, sans-serif'
              }}
            >
              Professional Links
            </Text>
            <Stack gap="xs">
              <Anchor 
                href="/varughese_resume.pdf" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: '#60a5fa',
                  fontSize: '16px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}
              >
                Resume
              </Anchor>
              <Anchor 
                href="https://www.linkedin.com/in/sujithvarughese/" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: '#60a5fa',
                  fontSize: '16px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}
              >
                LinkedIn
              </Anchor>
              <Anchor 
                href="http://github.com/sujithvarughese" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: '#60a5fa',
                  fontSize: '16px',
                  fontFamily: 'Space Grotesk, sans-serif'
                }}
              >
                GitHub
              </Anchor>
            </Stack>
          </Box>

          {/* Contact */}
          <Box mt="md">
            <Button 
              component="a" 
              href={`mailto:${emailAddress}`}
              variant="gradient"
              gradient={{ from: 'blue', to: 'green' }}
              size="lg"
              radius="md"
              fullWidth
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 600
              }}
            >
              Contact Me
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </Box>
  )
}

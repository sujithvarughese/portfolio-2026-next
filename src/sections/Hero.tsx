"use client"
import { motion } from "motion/react"
import { fullName, bio } from '@/data/data'
import React, { useEffect, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import {Anchor, Box, Button, Flex, Image, Text, TextInput, Title} from '@mantine/core'
import {SimpleTestimonials} from "@/components/ui/simple-testimonials";
import { heroImages } from "@/data/data";
import {IoIosSend} from "react-icons/io";
import {HeroForm} from "@/sections/chatbot/HeroForm";
const emailAddress = "sujith.varug@gmail.com"

type HeroProps = {
  form: any,
  handleSubmit: () => Promise<void>,
  openDrawer: () => void,
}

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex === 0) {
      // Initial delay before starting
      const initialTimer = setTimeout(() => {
        setCurrentIndex(1);
      }, delay);
      return () => clearTimeout(initialTimer);
    }

    if (currentIndex > 0 && currentIndex <= text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex));
        setCurrentIndex(currentIndex + 1);
      }, 50); // 50ms between each character

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

const Hero: React.FC<HeroProps> = ({ form, handleSubmit, openDrawer }) => {


  return (
    <Box 
      className="w-full"
      style={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        paddingTop: '80px', // Add padding to account for navbar
        overflowX: 'hidden'
      }}
    >
              <Flex direction={{ base: "column", md: "row" }} align="center" justify="center" style={{ minHeight: 'calc(100vh - 80px)' }} p={{ base: "md", md: "xl" }}>
        <Flex className="flex flex-col items-center justify-center w-full h-full" style={{ maxWidth: '100%' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeInOut",
              delay: 0,
            }}
            className="mt-8 bg-gradient-to-br from-white to-gray-200 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            {fullName}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xl py-4 text-center text-lg font-normal text-white"
          >
            <TypewriterText text={bio} delay={800} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Flex justify="center" align="center">
              <div className="mx-auto max-w-xl py-4 text-center text-lg font-normal text-white">
                <IoLocationSharp fontSize={28} color="white"/>
              </div>
              <p style={{ color: "white"}}>
                <TypewriterText text="Miami, FL" delay={1500} />
              </p>
            </Flex>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <HeroForm form={form} handleSubmit={handleSubmit} openDrawer={openDrawer} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Flex justify="center" w="100%" display={{ base: "none", sm: "flex" }} gap={60}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <Flex direction="column">
                    <Anchor href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718361/diploma_mv2evg.png" target="_blank" rel="noreferrer" style={{ color: '#228be6' }}>Bachelor's Diploma</Anchor>
                    <Anchor href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747725035/CompTIA_A_ce_certificate_tfbzb8.png" target="_blank" rel="noreferrer" style={{ color: '#228be6' }}>CompTIA A+</Anchor>
                    <Anchor href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747725095/Meta_front_end_certificate-_Coursera_eeuipu.png" target="_blank" rel="noreferrer" style={{ color: '#228be6' }}>Meta Front End Developer</Anchor>
                    <Anchor href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718364/accounting_certificate_ff7vvg.png" target="_blank" rel="noreferrer" style={{ color: '#228be6' }}>Accounting Technology</Anchor>
                    <Anchor href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718364/business_management_cert_kmza3i.png" target="_blank" rel="noreferrer" style={{ color: '#228be6' }}>Business Management</Anchor>
                  </Flex>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <Box>
                    <Flex direction="column">
                      <Anchor href="/varughese_resume.pdf" target="_blank" rel="noreferrer" style={{ color: '#228be6' }}>Resumé</Anchor>
                      <Anchor href="https://www.linkedin.com/in/sujithvarughese/" target="_blank" rel="noreferrer" style={{ color: '#228be6' }}>LinkedIn</Anchor>
                      <Anchor href="http://github.com/sujithvarughese" target="_blank" rel="noreferrer" style={{ color: '#228be6' }}>GitHub</Anchor>
                    </Flex>
                    <Button my={12} component="a" variant="filled" color="green" href={`mailto:${emailAddress}`}>Contact Me</Button>
                  </Box>
                </motion.div>
              </Flex>
            </motion.div>
          </motion.div>
        </Flex>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <SimpleTestimonials testimonials={heroImages} />
        </motion.div>
      </Flex>
    </Box>
  )
}

export default Hero



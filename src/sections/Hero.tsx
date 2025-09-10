"use client"
import { motion } from "motion/react"
import { fullName, bio } from '@/data/data'
import React, { useEffect, useState } from 'react'
import { IoLocationSharp } from "react-icons/io5";
import {Anchor, Box, Button, Flex, Image, Text, TextInput, Title} from '@mantine/core'
import {AnimatedTestimonials} from "@/components/ui/animated-testimonials";
import { heroImages } from "@/data/data";
import {IoIosSend} from "react-icons/io";
import {LampDemo} from "@/components/ui/lamp-demo";
import {LampContainer} from "@/components/ui/lamp";
const emailAddress = "sujith.varug@gmail.com"

type HeroProps = {
  form: any,
  handleSubmit: () => Promise<void>,
}

const Hero: React.FC<HeroProps> = ({ form, handleSubmit }) => {


  const [currentNameText, setCurrentNameText] = useState("")
  const [currentIntroductionText, setCurrentIntroductionText] = useState("")
  const [currentLocationText, setCurrentLocationText] = useState("")


  const updateWord = (word: string, currentWord: string) => {
    if (word.length === currentWord.length) {
      return currentWord
    }
    return word.substring(0, currentWord.length + 1)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentNameText !== fullName) {
        const updatedWord = updateWord(fullName, currentNameText)
        setCurrentNameText(updatedWord)
      } else if (currentIntroductionText !== bio) {
        const updatedWord = updateWord(bio, currentIntroductionText)
        setCurrentIntroductionText(updatedWord)
      } else if (currentLocationText !== "Miami, FL") {
        const updatedWord = updateWord("Miami, FL", currentLocationText)
        setCurrentLocationText(updatedWord)
      }
    }, 45)
    return () => clearTimeout(timer)
  }, [currentNameText, currentIntroductionText, currentLocationText])


  return (

    <LampContainer className="">
      <Box display={{ md: "flex" }} className="">
        <Flex className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Sujith Varughese
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-white dark:text-neutral-400"
          >
            {currentIntroductionText}
          </motion.p>

          <Flex justify="center" align="center">
            <motion.div
              initial={{ opacity: 0, y: -1000 }}
              animate={{
                opacity: 1, y: 0, x: 0,
                transition: { delay: 2, type: "spring", damping: 350, mass: 0.2, stiffness: 250  }
              }}
              className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-white dark:text-neutral-400"
            >
              <IoLocationSharp fontSize={28} color="white"/>
            </motion.div>
            <motion.p style={{ color: "white"}}>{currentLocationText}</motion.p>
          </Flex>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 1,
            }}
            className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a href={`mailto:${emailAddress}`}  className="w-60 transform cursor-pointer rounded-lg text-center font-bold bg-green-500 px-6 py-3 text-white transition-all duration-300 hover:bg-green-800">
              Email me
            </a>
            <Box bg="white" p={24} w="90%" maw={550} style={{ borderRadius: 8, boxShadow: "0px 0px 4px 0px rgba(0,0,0,0.25)"}}>
              <Text size="lg" mb={12} ta="center">AI Assistant</Text>
              {/*<form onSubmit={form.onSubmit(values => handleSubmit(values?.query))} style={{ borderRadius: 12 }}>
              <Flex gap={12} w="100%" justify="center">
                <TextInput placeholder="What are Sujith's skills?" key={form.key('query')}{...form.getInputProps('query')} w="70%"/>
                <Button w={96} type="submit" variant="gradient" loaderProps={{ type: 'dots' }} rightSection={<IoIosSend size={20}/>}>Send</Button>
              </Flex>
            </form>*/}
            </Box>
            <Flex justify="space-around" w="100%" display={{ base: "none", sm: "flex" }}>
              <Flex direction="column">
                <Anchor href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718361/diploma_mv2evg.png" target="_blank" rel="noreferrer">Bachelor's Diploma</Anchor>
                <Anchor href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747725035/CompTIA_A_ce_certificate_tfbzb8.png" target="_blank" rel="noreferrer">CompTIA A+</Anchor>
                <Anchor href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747725095/Meta_front_end_certificate-_Coursera_eeuipu.png" target="_blank" rel="noreferrer">Meta Front End Developer</Anchor>
                <Anchor href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718364/accounting_certificate_ff7vvg.png" target="_blank" rel="noreferrer">Accounting Technology</Anchor>
                <Anchor href="https://res.cloudinary.com/dts8hi7rg/image/upload/v1747718364/business_management_cert_kmza3i.png" target="_blank" rel="noreferrer">Business Management</Anchor>
              </Flex>
              <Box>
                <Flex direction="column">
                  <Anchor href="/varughese_resume.pdf" target="_blank" rel="noreferrer">Resumé</Anchor>
                  <Anchor href="https://www.linkedin.com/in/sujithvarughese/" target="_blank" rel="noreferrer">LinkedIn</Anchor>
                  <Anchor href="http://github.com/sujithvarughese" target="_blank" rel="noreferrer">GitHub</Anchor>
                </Flex>
                <Button my={12} component="a" href={`mailto:${emailAddress}`}>Contact Me</Button>
              </Box>
            </Flex>
          </motion.div>
        </Flex>
        <div>
          <AnimatedTestimonials testimonials={heroImages} />
        </div>
      </Box>



    </LampContainer>
  )
}

export default Hero



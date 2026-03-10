import React, {useState} from 'react'
import {ActionIcon, Box, Indicator, Text, Tooltip} from '@mantine/core'
import { RiAiGenerate2 } from "react-icons/ri";
import { motion } from 'motion/react'

type ChatbotButtonProps = {
  open: () => void,
}

const ChatbotButton = ({ open }: ChatbotButtonProps) => {

  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    open()
  }


  return (
    <Box
      component={motion.div}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      animate={clicked ?  {} : { scale: [1, 1.1, 1] }} // Flash effect
      // @ts-ignore
      transition={ clicked ? { ease: "easeInOut" } :{
        duration: 0.5, // Speed of flashing
        repeat: Infinity, // Loop forever
        repeatDelay: 2,
        type: "bounce",
      }}
    >
      <Tooltip label="AI Chatbot" >
        <ActionIcon style={{ border: "4px solid orange", borderRadius: "50%"}} variant="gradient" onClick={handleClick} size={42}>
          <RiAiGenerate2 size={32} />
        </ActionIcon>


      </Tooltip>
    </Box>
  )
}


export default ChatbotButton
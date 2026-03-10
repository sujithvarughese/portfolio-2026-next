import { Avatar, Box, Paper, Text } from '@mantine/core'
import * as React from 'react'

const Message = ({ sender, message }) => {
  return (
    <Box pos="relative">
      <Paper
        shadow="lg"
        radius="md"
        mx={24}
        mt={4}
        mb={16}
        p={8}
        w="80%"
        bg={`${sender === "user" ? "blue.4" : "lightgray"}`}
        ml={sender === "user" ? 56 : 24}
      >
        <Text style={{ whiteSpace: "pre-wrap", wordWrap: "break-word"}}>{message}</Text>
      </Paper>
      {sender === "assistant" &&
        <Avatar
          name="AI"
          pos="absolute"
          color="initials"
          left={-12}
          bottom={-24}
        />}
    </Box>

  )
}

export default Message
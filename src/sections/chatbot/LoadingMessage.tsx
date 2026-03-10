import { Avatar, Box, Loader, Paper } from '@mantine/core'
import * as React from 'react'

const LoadingMessage = () => {

  return (
    <Box pos="relative">
      <Paper
        shadow="lg"
        radius="md"
        mx={24}
        mt={4}
        mb={24}
        py={8}
        px={16}
        w="30%"
        bg="lightgray"
        style={{ justifySelf: "start" }}
      >
        <Loader type="dots" color="black" size="sm"/>
      </Paper>
      <Avatar
        name="AI"
        pos="absolute"
        color="initials"
        left={-12}
        bottom={-24}
      />
    </Box>
  )
}

export default LoadingMessage
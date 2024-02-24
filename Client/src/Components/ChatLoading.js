import {  Stack } from '@chakra-ui/react'
import React from 'react'
import { Skeleton } from '@chakra-ui/skeleton'

const ChatLoading = () => {
  return (
    <Stack>
     <Skeleton height="40px"/>
     <Skeleton height="40px"/>
     <Skeleton height="40px"/>
     <Skeleton height="40px"/>
     <Skeleton height="40px"/>   
    </Stack>
  )
}

export default ChatLoading
import { Box } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from './Authentication/Context/auth';
import SingleChat from './UserAvatar/SingleChat';

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const [auth, setAuth, selectedChat, setSelectedChat, chat, setChat] =
    useAuth();


  return (
   <Box
   display={{base:selectedChat? 'flex':'none',md:'flex'}}
   alignItems='center'
   flexDir='column'
   p={5}
   border={3}
   bg='white'
   w={{base:'50%', md:'69%'}}
   borderRadius='lg'
   borderWidth='1px'
  
   >
   <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
   </Box>
  )
}

export default ChatBox
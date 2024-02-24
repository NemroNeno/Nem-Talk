import React, { useEffect, useState } from 'react'
import { useAuth } from '../Authentication/Context/auth';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { Icon, ChevronDownIcon, BellIcon,ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from '../ProfileModal';
import GroupUpdate from './../GroupUpdate';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io  from 'socket.io-client';
const SingleChat = ({fetchAgain,setFetchAgain}) => {
    const ENDPOINT='http://localhost:3200';
    var socket,selectedChatCompare; 
    socket=io(ENDPOINT);
    const [auth, setAuth, selectedChat, setSelectedChat, chat, setChat] =
    useAuth();
    const toast=useToast();
    

const [messages,setMessages]=useState([]);
const [loading,setLoading]=useState(false);
const [newMessage,setNewMessage]= useState([]);
const [socketConnected,setSocketConnected]=useState(false);
    const getSender = (lUser, arr) => {
        return lUser._id === arr[0]._id ? arr[1].name : arr[0].name;
      };
      const getUser = (lUser, arr) => {
        return lUser._id === arr[0]._id ? arr[1] : arr[0];
      };
      
 const fetchMessages= async()=>{
  try {
    //  setLoading(true);
    if(!selectedChat)
    return;
    
    const config = {
      headers: {
        Authorization: auth.token,
      },
    };


const {data}= await axios.get(`http://localhost:3200/messages/${selectedChat._id}`);
socket.emit('join_chat',selectedChat?._id);
setMessages(data);
setLoading(false);


  } catch (error) {
      setLoading(false);
      console.log(error);
  }
}

      
    useEffect(()=>{
        fetchMessages();
        selectedChatCompare=selectedChat;
      },[selectedChat,messages])
  
  useEffect(()=>{
    socket.on('messageRecieved',(newMessageRecieved)=>{
       // if(!selectedChatCompare||
         //    selectedChatCompare._id!==newMessageRecieved.chat._id){
                //Give notification
           // }
             //else{
                console.log('The message is reaching at this side also');
                 setMessages([...messages,newMessageRecieved]);
           
             //}
    })
  })

      useEffect(()=>{
          
         socket.emit('setup',auth.user);
         socket.on('connection',()=>{
          setSocketConnected(true);
  
         }) 
      },[])

//here it was

// Border function




const sendMessageSocket= async(con,id)=>{

    
  try {

const config = {
  headers: {
    Authorization: auth.token,
  },
};
setNewMessage('');
const {data}= await axios.post('http://localhost:3200/messages',{
  content:con,
  chatId:id,
},config);


socket.emit('newMessage',data);
setMessages([...messages,data]);



      
  } catch (error) {
      console.log(error);

  }

}











// Border function

      const sendMessage= async(event)=>{

          
        try {
if(event.key==='Enter' && newMessage){
    const config = {
        headers: {
          Authorization: auth.token,
        },
      };
      setNewMessage('');
      const {data}= await axios.post('http://localhost:3200/messages',{
        content:newMessage,
        chatId:selectedChat._id,
      },config);

      setTimeout(function(){socket.emit('newMessage',data);},1000);
     // socket.emit('newMessage',data);
      setMessages([...messages,data]);
      //fetchMessages();

    
}

            
        } catch (error) {
            console.log(error);

        }

      }
  
















/// Border of a function



      const typingHandler=  (e)=>{

        setNewMessage(e.target.value)
       
      }




      useEffect(()=>{
        
         
      },[selectedChat])

  return (
    <>
    {selectedChat?(<>
<Text
fontSize={{base:'20px',md:'30px'}}
pb={1}
px={1}
w='100%'
fontFamily='Work sans'
display='flex'
justifyContent={{base:'space-between'}}
alignItems='center'
>
<IconButton display='flex' icon={<ArrowBackIcon/>} onClick={()=>setSelectedChat('')}/>
{!selectedChat.isGroupChat?(<>{
  getSender(auth.user,selectedChat.users)

}
<ProfileModal user={getUser(auth.user,selectedChat.users)}/> 
</>)
:
(<>{selectedChat.chatName.toUpperCase() }</>)}
{
    <GroupUpdate fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}/>
}

</Text>
<Box
display='flex'
flexDir='column'
justifyContent='flex-end'
p={1}
bg='#E8E8E8'
w='100%'
h='100%'
borderRadius='1g'
overflow='hidden'
>
{loading?(<Spinner
    size='xl'
    w={20}
    h={20}
    alignSelf='center'
    margin='auto'
/>):(<>
    <div className='messages'>
<ScrollableChat messages={messages}/>
    </div>
</>)}



<FormControl onKeyDown={sendMessage} isRequired mt={3} justifySelf='center'>
<Input
    variant='filled'
    big='#E0E0E0'
    placeholder='Enter a message...'
    onChange={typingHandler}
    value={newMessage}
/>
</FormControl>
</Box>

    
    </>):(<>
        <Box display='flex' alignItems='center' h='100%'>
      <Text fontSize='30px' pb={3} fontFamily='Work Sans' color='grey'>
       Click on a user to start chatting
        
      </Text>
 
        </Box>
    </>)}
    </>
  )
}

export default SingleChat
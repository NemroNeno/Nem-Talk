import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    useDisclosure,
    Button,
    Box,
    FormControl,
    Input,
    useToast,
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { useAuth } from './Authentication/Context/auth';
import UserBadgeItem from './UserAvatar/UserBadgeItem';
import axios from 'axios';
import UserListItem from './UserAvatar/UserListItem';

const GroupUpdate = ({fetchAgain,setFetchAgain,fetchMessages}) => {
    const toast=useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();



    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [RenameLoading, setRenameLoading] = useState(false);
  
    const [auth, setAuth, selectedChat, setSelectedChat, chat, setChat] = useAuth();


    


     const handleAddUser = async(user1) => {
        if(selectedChat.users.find((u)=>u._id===user1._id)){
        toast({
            title:"User already in group!",
            status:'error',
            duration:5000,
            isClosable:true,
            position:'bottom'
       })   
        return;
     }
     
     /*if(selectedChat.groupAdmin._id!==auth.user._id){
     
      toast({
       title:'Only Admins can add someone!',
       status:'error',
       duration:3000,
       isClosable:true,
       position:'bottom',
      })
     }
     */
     
     try {
        const config = {
            headers: {
              Authorization: auth.token,
            },
          };
       setLoading(true);
       const {data}= await axios.put('http://localhost:3200/chat/groupAdd',{
        chatId:selectedChat._id,
        userId:user1._id,
       },config);
       setSelectedChat(data);
       setFetchAgain(!fetchAgain);
       setLoading(false);
       
     
     
     } catch (error) {
       setLoading(false);
       toast({
         title:'Error in adding a new member!',
         status:'error',
         duration:3000,
         isClosable:true,
         position:'bottom',
        })
       console.log(error)
     }
     
       };


/*

       const handleRemove = async(user1) => {

     
     /*if(selectedChat.groupAdmin._id!==auth.user._id){
     
      toast({
       title:'Only Admins can add someone!',
       status:'error',
       duration:3000,
       isClosable:true,
       position:'bottom',
      })
     }
     
     
     try {
        const config = {
            headers: {
              Authorization: auth.token,
            },
          };
       //setLoading(true);
       const {data}= await axios.put('http://localhost:3200/chat/groupDelete',{
        chatId:selectedChat._id,
        userId:user1._id,
       },config);
       setSelectedChat(data);
       setFetchAgain(!fetchAgain);
       setLoading(false);
       
     
     
     } catch (error) {
       setLoading(false);
       toast({
         title:'Error in adding a new member!',
         status:'error',
         duration:3000,
         isClosable:true,
         position:'bottom',
        })
       console.log(error)
     }
     
       };
*/




































     const handleRename= async(u)=>{
            if(!groupChatName)
            return;

            try {
                console.log(auth.token);
                setRenameLoading(true);
                const config = {
                    headers: {
                      Authorization: auth.token,
                    },
                  };
                const {data}=await axios.put('http://localhost:3200/chat/rename',{
                    chatId:selectedChat._id,
                    chatName:groupChatName,

                },config)

                setSelectedChat(data);
                setFetchAgain(!fetchAgain);
                setRenameLoading(false);
                toast({
                    title:"Changed the group name!",
                    status:"success",
                    duration:3000,
                    isClosable:true,
                    position:"bottom",
                })

                setGroupChatName('');
            } catch (error) {
                setRenameLoading(false);
                toast({
                    title:"Failed to rename a the group chat chat!",
                    status:"error",
                    duration:3000,
                    isClosable:true,
                    position:"bottom",
                })
                
                console.log(error) 
            }
        
     }

     


     const handleSearch= async(query)=>{
        try {
            setSearch(query);
            if (!query) {
              return;
            }
      
            setLoading(true);
            const config = {
              headers: {
                Authorization: auth.token,
              },
            };
      
            const res = await axios.get(
              `http://localhost:3200/auth/getAllUser?search=${search}`,
              config
            );
      
            setSearchResult(res?.data?.users);
            setLoading(false)
            console.log(searchResult);
          } catch (error) {
            console.log(error);
            toast({
              title: "Error occured",
              status: "error",
              isClosable: true,
            });
          }
        

     }
   

const handleRemove=async(user1)=>{
if(selectedChat.groupAdmin._id!==auth.user._id && user1._id!==auth.user_id){
    toast({
        title:'Only admins can remove someone!',
        status:'error',
        duration:3000,
        isClosable:true,
        positon:'bottom'
    })
    return;
}

try {
    setLoading(true);
    const config = {
        headers: {
          Authorization: auth.token,
        }};

const {data}=await axios.put('http://localhost:3200/chat/groupDelete',{
    chatId:selectedChat._id,
    userId:user1._id,
},config);

 setSelectedChat(data);

setFetchAgain(!fetchAgain);
setLoading(false);

} catch (error) {
    console.log(error);
    setLoading(false);
}

}

  


const handleRemoveGroup= async(i)=>{
    console.log('clickeed')
 try {
    const config = {
        headers: {
          Authorization: auth.token,
        }};

    const {data}=await axios.delete('http://localhost:3200/chat/groupDrop',{id:i},config)
    if(data?.success){
        alert('Group Removed!');
    }
    if(!data?.success){
        alert('Something went wrong in removing the group');
    }
    fetchMessages();
 } catch (error) {
    console.log(error)
 }

}
  return (
    <>
    <IconButton icon={<ViewIcon/>} onClick={onOpen}/>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader
      fontSize='35px'
      fontFamily='Work sans'
      display='flex'
      justifyContent='center'
      >{selectedChat.chatName.toUpperCase()}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
      <Box w='100%' display='flex' flexWrap='wrap' pb={3}>
        {selectedChat.users.map(u=>(
            <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={()=>handleRemove(u)}
                /> 
        ))}
      </Box>
      <FormControl display='flex'>
      <Input
        placeholder='Change Group Name'
        mb={3}
        value={groupChatName}
        onChange={(e)=>setGroupChatName(e.target.value)}
      />
      <Button
      variant='solid'
      colorScheme='teal'
      ml={1}
      isLoading={RenameLoading}
      onClick={handleRename}
      >Update</Button>

      </FormControl>
      <FormControl>
              <Input
                placeholder="Enter the user names"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <>Loading</>
            ) : (
              searchResult.slice(0, 4).map((u) => (
                <>
                  <UserListItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleAddUser(u)}
                  />
                </>
              ))
            )}

      </ModalBody>

      <ModalFooter>
        <Button colorScheme='red' mr={3} onClick={()=>handleRemoveGroup(selectedChat._id)}>
          Leave Group
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  </>
  )
}

export default GroupUpdate
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  Toast,
  useToast,
  Heading,
  Box,

} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "./Authentication/Context/auth";
import axios from "axios";
import UserListItem from "./UserAvatar/UserListItem";
import UserBadgeItem from "./UserAvatar/UserBadgeItem";

const GroupModel = ({ children }) => {

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [auth, setAuth, selectedChat, setSelectedChat, chat, setChat] =
    useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const config = {
            headers: {
              Authorization: auth.token,
            },
          };
        
          const {data} = await axios.post(
            `http://localhost:3200/chat/group`,{name:groupChatName,users:JSON.stringify(selectedUsers.map(p=>p._id))},
            config
          );
         setChat([data,...chat]);
         onClose()
         toast({
          title: 'Group Chat Succesfull.',
          description: "Group Chat creatd successfully!.",
          status: 'success',
          duration: 3000,
          isClosable: true,
          
        })
    
    } catch (error) {
      toast({
        title:"Failed to create a Group chat!",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom",
       });
        console.log(error);
    }
  };

  const handleGroup = (u) => {
    if (selectedUsers.includes(u)) {
      return;
    }

    setSelectedUsers([...selectedUsers, u]);
  };


 const handleDelete=(u)=>{
    setSelectedUsers(selectedUsers.filter((sel)=>sel._id!==u._id));

 }
  const handleSearch = async (query) => {
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
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="35px" display="flex" justifyContent="center">
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Group Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="Enter the user names"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
<Box display="flex">

            {selectedUsers.map(u=>(
                <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={()=>handleDelete(u)}
                />
            ))}
</Box>

            {loading ? (
              <>Loading</>
            ) : (
              searchResult.slice(0, 4).map((u) => (
                <>
                  <UserListItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleGroup(u)}
                  />
                </>
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button color="red" onClick={handleSubmit}>
              Create Group Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupModel;

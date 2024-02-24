import React, { useEffect, useState } from "react";
import { useAuth } from "./Authentication/Context/auth";
import { Box, Button, Stack, useToast, Text } from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./ChatLoading";
import GroupModel from "./GroupModel";

const MyChats = ({fetchAgain}) => {
  ///const [loggedUser, setLoggedUser] = useState();
  const [auth, setAuth, selectedChat, setSelectedChat, chat, setChat] =
    useAuth();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: auth.token,
        },
      };

      const res = await axios.get("http://localhost:3200/chat", config);
      setChat(res?.data);
    
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchAgain]);

  const getSender = (lUser, arr) => {
    return lUser._id === arr[0]._id ? arr[1].name : arr[0].name;
  };
  return (
    
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: selectedChat?'0%':"100%", md: "30%" }}
      borderRadius="1g"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        display="flex"
        flexDir='column'
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupModel>
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
        </GroupModel>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
           
        {chat ? (
          <Stack overflowY="scroll">
            {chat?.map((c) => (
              <Box
                onClick={() => setSelectedChat(c)}
                cursor="pointer"
                bg={selectedChat === c ? "#3882AC" : "#E8E8E8"}
                color={selectedChat === c ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={c?._id}
              >
                <Text>
                  {!c.isGroupChat
                    ? getSender(auth.user, c.users)
                    : c?.chatName}
                </Text>
              </Box>
        ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
   
  );
};

export default MyChats;

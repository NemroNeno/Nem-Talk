import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../Authentication/Context/auth";
import { motion } from "framer-motion";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
  keyframes,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ChevronDownIcon,
  BellIcon,
  Icon,
} from "@chakra-ui/icons";
import ProfileModal from "../ProfileModal";
import GroupUpdate from "./../GroupUpdate";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const ENDPOINT = "http://localhost:3200";
  const [auth, setAuth, selectedChat, setSelectedChat, chat, setChat] =
    useAuth();
  const toast = useToast();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState();
  const [isTyping, setIsTyping] = useState();

  const socket = useMemo(() => io(ENDPOINT), []);

  useEffect(() => {
    let ident;

    const handleTypingEvent = (packet) => {
      if (packet?.auth === auth?.user?._id || isTyping) {
        return;
      } else {
        setIsTyping(true);
        ident = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    };

    socket.on("typingEvent", handleTypingEvent);

    return () => {
     
      socket.off("typingEvent", handleTypingEvent);
    };
  }, [socket, isTyping, auth]);

  useEffect(() => {
    const handleNewMessage = (newMessageReceived) => {
      if (auth.user._id === newMessageReceived.sender._id) return;
      setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      console.log(messages);
      setIsTyping(false);
    };
    socket.on("messageRecieved", handleNewMessage);
  }, []);

  const getSender = (lUser, arr) => {
    return lUser._id === arr[0]._id ? arr[1].name : arr[0].name;
  };

  const getUser = (lUser, arr) => {
    return lUser._id === arr[0]._id ? arr[1] : arr[0];
  };

  const fetchMessages = async () => {
    try {
      if (!selectedChat) return;

      const config = {
        headers: {
          Authorization: auth.token,
        },
      };

      const { data } = await axios.get(
        `http://localhost:3200/messages/${selectedChat._id}`
      );

      socket.emit("join_chat", selectedChat?._id);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (event) => {
    try {
      if (event.key === "Enter" && newMessage) {
        const config = {
          headers: {
            Authorization: auth.token,
          },
        };

        const packet = {
          content: newMessage,
          sender: { _id: auth.user._id, name: auth.user.name },
          room: selectedChat._id,
        };
        setNewMessage("");
        //console.log(messages);
        socket.emit("newMessage", packet);
        setMessages([...messages, packet]);

        const { data } = await axios.post(
          "http://localhost:3200/messages",
          {
            content: packet.content,
            chatId: selectedChat._id,
          },
          config
        );

        //   setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const typingHandler = (e) => {
    socket.emit("typing", {
      room: selectedChat._id,
      auth: auth.user._id,
    });

    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "20px", md: "30px" }}
            pb={1}
            px={1}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display="flex"
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(auth.user, selectedChat.users)}
                <ProfileModal user={getUser(auth.user, selectedChat.users)} />
              </>
            ) : (
              <div>{selectedChat.chatName.toUpperCase()}</div>
            )}
            <GroupUpdate
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              fetchMessages={fetchMessages}
            />
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={1}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="1g"
            overflow="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <>
                <div className="messages">
                  <ScrollableChat messages={messages} socket={socket} />
                </div>
              </>
            )}
            {
              <div
                hidden={!isTyping}
                className="p-2 animate-pulse duration-50 font-bold text-[#0c31ecd7]"
              >
                Typing...
              </div>
            }
            <FormControl
              onKeyDown={sendMessage}
              isRequired
              mt={3}
              justifySelf="center"
            >
              <Input
                variant="filled"
                big="#E0E0E0"
                placeholder="Enter a message..."
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <>
          <Box display="flex" alignItems="center" h="100%">
            <Text fontSize="30px" pb={3} fontFamily="Work Sans" color="grey">
              Click on a user to start chatting
            </Text>
          </Box>
        </>
      )}
    </>
  );
};

export default SingleChat;

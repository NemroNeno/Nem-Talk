import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Icon, ChevronDownIcon, BellIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import ProfileModal from "./ProfileModal";
import { useAuth } from "./Authentication/Context/auth";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserAvatar/UserListItem";
import { Spinner } from "@chakra-ui/spinner";
const SideDrawer = () => {
  const [auth,setAuth,selectedChat,setSelectedChat,chat,setChat] = useAuth();
  const navig = useNavigate();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [loadingChat, setLoadingChat] = useState(false);

  const toast = useToast();

  const handleLogout = () => {
    localStorage.removeItem("authChat");
    setAuth(null);
    navig("/");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in the search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: auth.token,
          },
        };

        const { data } = await axios.get(
          `http://localhost:3200/auth/getAllUser?search=${search}`,config

          
        );
        if (data?.success) {
          toast({
            title: "Users retrieved successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-left",
          });
          setSearchResult(data?.users);
          setLoading(false);
           
        } else {
          toast({
            title: "Something went wrong",
            status: "warning",
            duration: 3000,
            isClosable: true,
            position: "top-left",
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  const accessChat= async(userId)=>{
        try {
            
            setLoadingChat(true);
            const config = {
                headers: {
                  Authorization: auth.token,
                },
              };
               const {data}= await axios.post("http://localhost:3200/chat",{userId},config);
               if(!chat?.find((c)=>c._id===data._id))
               setChat([data,...chat]);




               setSelectedChat(data);
               setLoadingChat(false);
                 

            
             
        } catch (error) {
            toast({
                title:"Error in fetching the chat",
                description:error.message,
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left",
            })
            console.log(error)
        }

  }
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search user
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl">Connectify</Text>
        <div>
          <Menu p={4}>
            <MenuButton>
              <BellIcon fontSize="2xl" m={3} />
            </MenuButton>
            <MenuList></MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" cursor="pointer" name={"Muhammad Nabeel"} />
            </MenuButton>

            <MenuList>
              <ProfileModal user={auth?.user}>
                <MenuItem>Profile Page</MenuItem>
              </ProfileModal>
              <MenuItem onClick={handleLogout}>Logout </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by Name or Email"
                mr={2}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setLoading(true)
                }}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading?(<ChatLoading/>):(
                searchResult?.map(user=>(
                   <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={()=>accessChat(user._id)}
                   /> 
                ))
            )}
            {loadingChat &&<Spinner/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

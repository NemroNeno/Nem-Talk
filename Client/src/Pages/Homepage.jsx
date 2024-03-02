import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Signup from "../Components/Authentication/Signup";
import Login from "../Components/Authentication/Login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Components/Authentication/Context/auth";
import pic from "../Pictures/chat.svg";
import name from "../Pictures/name.svg";

const Homepage = () => {
  const [auth, setAuth] = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("authChat");
    if (data) {
      nav("/chat");
    }
  }, []);
  return (
    <Container className="max-w-full h-5/6" centerContent>
      <img
        src={pic}
        width={90}
        height={90}
        className="mix-blend-difference absolute left-0 top-0 animate-pulse duration-1000"
      />
      <img src={name} width={350} height={50} className="" />

      <Box
        w="100%"
        h="80vh"
        className="bg-gradient-to-br from-black to-gray-600  text-white "
        borderRadius="lg"
        borderWidth="1px"
        p={4}
      >
        <Tabs variant="soft-rounded" colorScheme="gray" >
          <TabList>
            <Tab w="70%" className="focus:font-bold">
              Login
            </Tab>
            <Tab w="30%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <div className="h-[30px] m-1 font-bold text-[#8d8b8b]">
        All rights reserved by @Nemro
      </div>
    </Container>
  );
};

export default Homepage;

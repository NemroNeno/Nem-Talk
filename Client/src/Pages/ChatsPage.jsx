import axios from "axios";
import React, { useEffect, useState } from "react";
import SideDrawer from "../Components/SideDrawer";
import { useAuth } from "../Components/Authentication/Context/auth";
import MyChats from "../Components/MyChats";
import ChatBox from "../Components/ChatBox";
import { Box } from "@chakra-ui/react";

const ChatsPage = () => {
    const [auth,setAuth]= useAuth();
    const [fetchAgain,setFetchAgain]=useState(false);
  

  useEffect(() => {
    
  }, []);

  return (

    <div style={{width:"100%"}}>

      {auth?.user&& <SideDrawer/>}
    <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
      {auth?.user&& <MyChats  fetchAgain={fetchAgain}/>}
      {auth?.user&& <ChatBox  fetchAgain={fetchAgain}  setFetchAgain={setFetchAgain}  />}
    </Box>
    
     
    </div>
  );
};

export default ChatsPage;

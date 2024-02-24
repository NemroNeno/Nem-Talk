import { Box, Container,Text,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Signup from '../Components/Authentication/Signup'
import Login from '../Components/Authentication/Login'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Components/Authentication/Context/auth'



const Homepage = () => {
    const [auth,setAuth]=useAuth();
    const nav= useNavigate();
    useEffect(()=>{
        const data = localStorage.getItem("authChat");
        if (data) {
               
             nav("/chat");
              
        }


      },[])
  return (
    <Container maxW="xl" centerContent>
        <Box display="flex" 
        justifyContent="center"
        alignItems="center"
        p={3}
           bg={"white"}
           w="100%" 
           m="40px 0 15px 0"
           borderRadius="lg"
           borderWidth="1px"

           >
            <Text fontSize="4xl" > Talk </Text>
        </Box>


<Box w="100%"
   h="80vh"
   bg={"white"}
   borderRadius="lg"
           borderWidth="1px"
           p={4}
>
<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab w="70%">Login</Tab>
    <Tab w="30%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     <Login/>
    </TabPanel>
    <TabPanel>
     <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
</Box>

    </Container>
  )
}

export default Homepage
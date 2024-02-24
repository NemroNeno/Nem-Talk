import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "./Context/auth";

const Login = () => {
    const [auth,setAuth]= useAuth();
    const nav= useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [user_info, setinfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setinfo({
      ...user_info,
      [name]: value,
    });
    console.log(user_info);
  };

  const invertShow = () => {
    setShow(!show);
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      console.log(user_info);
      const res = await axios.post(
        "http://localhost:3200/auth/login",
        user_info
      );
      if (res?.data?.success) {
        setLoading(false);
        setAuth({
          ...auth,
          user:res?.data?.user,
          token:res.data.token
        })
        localStorage.setItem("authChat",JSON.stringify(res?.data));
        
        toast({
          title: "Success.",
          description: "Successfully logged in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      nav("/chat");
      } else {
        setLoading(false)
        toast({
          title: "Authorization Error",
          description: "entered Email or password is wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  return (
    <div>
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type={"email"}
            placeholder="Enter Your Email "
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Enter Password</FormLabel>
          <InputGroup>
            <Input
              name="password"
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={handleChange}
            />
            <InputRightElement>
              <Button h="1.75rem" size="sm" onClick={invertShow}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          width="100%"
          colorScheme="green"
          style={{ marginTop: 15 }}
          onClick={handleLogin}
          isLoading={loading}
        >
          Login
        </Button>
      </VStack>
    </div>
  );
};

export default Login;

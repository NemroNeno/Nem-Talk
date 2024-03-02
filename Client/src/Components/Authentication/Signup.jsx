import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Signup = () => {
    const toast =useToast();
  const [show, setShow] = useState(false);
  const [loading,setLoading]=useState(false);
  const [pic, setPic] = useState("");
  const [user_info, setinfo] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setinfo({
      ...user_info,
      [name]: value,
    });
  };

  const invertShow = () => {
    setShow(!show);
  };

  const handlePic = (pic) => {
    setPic(pic);
    console.log(pic);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = new FormData();
    userData.append("name", user_info.name);
    userData.append("email", user_info.email);
    userData.append("password", user_info.password);
    userData.append("pic", pic);

    try {
      console.log("function being called!!");
      const res = await axios.post(
        " http://localhost:3200/auth/register",
        userData
      );
      if (res?.data?.success) {
        setLoading(false);
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 5000,
            isClosable: true,
            
          })
      } else {
        setLoading(false)
        toast({
            title: 'Error',
            description: res.data.message,
            status: 'warning',
            duration: 9000,
            isClosable: true,
          })
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          placeholder="Enter Your Name"
          onChange={handleChange}
          value={user_info.name}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type={"email"}
          placeholder="Enter Your Email "
          onChange={handleChange}
          value={user_info.email}
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
            value={user_info.password}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={invertShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="rePassword" isRequired>
        <FormLabel>ReEnter your Password</FormLabel>
        <InputGroup>
          <Input
            name="rePassword"
            value={user_info.rePassword}
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

      <FormControl id="pic" isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <InputGroup>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => handlePic(e.target.files[0])}
          />
        </InputGroup>
      </FormControl>

      <button
        width="100%"
        className=" text-bold text-xl bg-gradient-to-tr hover:text-red-600 from-blue-900 to-black w-full h-[40px] mt-[40px] hover:bg-gradient-to-bl  duration-500  hover:from-blue-900 hover:to-gray-900 anime !transition-colors"
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign Up
      </button>
    </VStack>
  );
};

export default Signup;

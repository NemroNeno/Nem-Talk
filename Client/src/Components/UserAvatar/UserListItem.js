import { Box,Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      h="10%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={5}
      mb={2}
      mt={4}
      borderRadius="lg"
    >
      <Box>
        <Text pt={3}>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email:</b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;

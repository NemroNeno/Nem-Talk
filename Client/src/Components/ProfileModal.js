import { useDisclosure } from "@chakra-ui/hooks";
import React from "react";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { useAuth } from "./Authentication/Context/auth";

const ProfileModal = ({ user, children }) => {
  const [auth, setAuth] = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <>
          <span onClick={onOpen}>{children}</span>
        </>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClickCapture={onOpen}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" fontSize="40px" justifyContent="center">
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody
            display="flex"
            flexDir="column"
            justifyContent="space-between"
          >
            <img
              src={`http://localhost:3200/auth/getUserPhoto/${auth.user.email}`}
              className="w-20 h-20 rounded-full"
            />
            Email: {user.email}
          </ModalBody>

          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

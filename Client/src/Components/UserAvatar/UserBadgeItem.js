import { CloseIcon } from '@chakra-ui/icons'
import { Box,Button } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <Box
     px={2}
     py={1}
     borderRadius="1g"
     m={1}
     mb={2}
     variant="solid"
     fontSize={12}
     backgroundColor="purple"
     color="white"
     cursor="pointer"
     onClick={handleFunction}

    >
       {user.name}
       <CloseIcon pl={1}/>
    </Box>
  )
}

export default UserBadgeItem
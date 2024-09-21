import { Box, Heading, Image } from '@chakra-ui/react'

import EmptyImg from '@assets/images/empty.png'

const EmptyState = () => {
  return (
    <Box
      mt="20px"
      textAlign="center"
      bg="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      py="20px">
      <Heading as="h5" size="md">You have not created any post for this yet.</Heading>

      <Image
        src={EmptyImg}
        width={"200px"}
        height={"200px"}

      />
    </Box>
  )
}

export default EmptyState;
import { FunctionComponent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Center, Heading, Text } from '@chakra-ui/react'

import { Button } from '@components/index'

const NotFound: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <Center h="60vh">
      <Box textAlign="center">
        <Heading
          as="h2"
          size={{ base: "lg", md: "xl" }}
        >
          Oops, it seems you are lost
        </Heading>
        <Text
          fontSize="md"
          py="15px"
        >
          You may be trying to access a file that has been removed or relocated.
        </Text>
        <Button
          variant="solid"
          size={{ base: "md", lg: "lg" }}
          type="button"
          fontWeight={"semibold"}
          rounded="sm"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back Home
        </Button>
      </Box>
    </Center>
  )
}

export default NotFound;
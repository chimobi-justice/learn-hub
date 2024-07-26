import { FunctionComponent } from 'react'
import { 
  Box, 
  Card, 
  CardBody, 
  FormControl, 
  FormLabel, 
  SimpleGrid
} from '@chakra-ui/react'

import { 
  Button, 
  Input, 
  TextArea
} from '@components/index'

const UpdateProfile: FunctionComponent = () => {
  return (
    <Card>
      <CardBody>
        <SimpleGrid minChildWidth="300px" spacing={3}>
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input
              type="text"
              name='fullname'
              placeholder="Fullname"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name='username'
              placeholder="Username"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="text"
              name='email'
              placeholder="Email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Twitter</FormLabel>
            <Input
              type="text"
              name='username'
              placeholder="@"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>GitHub</FormLabel>
            <Input
              type="text"
              name='username'
              placeholder="github username"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Website</FormLabel>
            <Input
              type="text"
              name='username'
              placeholder="www.john.com"
            />
          </FormControl>
        </SimpleGrid>

        <Box my={"15px"}>

          <FormControl isRequired>
            <FormLabel>Bio</FormLabel>
            <TextArea
              placeholder="Bio..."
              name="bio"
            />
          </FormControl>
        </Box>

        <Box textAlign={"right"} mt={"10"}>
          <Button
            variant="solid"
            size={{ base: "sm", lg: "md" }}
            width={{ base: "100%", lg: "auto" }}
            type="button"
            fontWeight={"semibold"}
            rounded="sm"
          >
            Update Profile
          </Button>
        </Box>
      </CardBody>
    </Card>
  )
}

export default UpdateProfile
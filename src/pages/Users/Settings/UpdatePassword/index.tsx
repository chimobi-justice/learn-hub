import { FunctionComponent } from 'react'
import { 
  Box, 
  Card, 
  CardBody, 
  FormControl, 
  FormLabel 
} from '@chakra-ui/react'

import { 
  Button, 
  Input, 
} from '@components/index'

const UpdatePassword: FunctionComponent = () => {
  return (
    <Card mt={"10"}>
      <CardBody>
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

        <Box textAlign={"right"} mt={"10"}>
          <Button
            variant="solid"
            size={{ base: "sm", lg: "md" }}
            width={{ base: "100%", lg: "auto" }}
            type="button"
            fontWeight={"semibold"}
            rounded="sm"
          >
            Update Password
          </Button>
        </Box>
      </CardBody>
    </Card>
  )
}

export default UpdatePassword
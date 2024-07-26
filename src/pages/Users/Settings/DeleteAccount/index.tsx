import { FunctionComponent } from 'react'
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text
} from '@chakra-ui/react'

import { Button } from '@components/index'

const DeleteAccount: FunctionComponent = () => {
  return (
    <Card>
      <CardBody>
        <Heading as={"h5"} size={"md"} color={"red"}>Danger Zone</Heading>
        <Text my={"8px"} fontSize={"17px"} lineHeight={"1.6em"} color={"#0009"}>
          Please be aware that deleting your account will also remove all of your data, including your threads and articles.
        </Text>


        <Box textAlign={"right"} mt={"10"}>
          <Button
            variant="danger"
            size={{ base: "sm", lg: "md" }}
            width={{ base: "100%", lg: "auto" }}
            type="button"
            fontWeight={"semibold"}
            rounded="sm"
          >
            Delete Account
          </Button>
        </Box>
      </CardBody>
    </Card>
  )
}

export default DeleteAccount
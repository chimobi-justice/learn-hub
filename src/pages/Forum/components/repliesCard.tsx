import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'

const RepliesCard = () => {
  const data = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Card mt={"20px"} ml={"35px"}>
      <CardHeader pb={"4px"}>
        <Heading size={"sm"}>Replies</Heading>
      </CardHeader>

      <CardBody>
        <Stack
          divider={<StackDivider />}
          spacing={4}
          lineHeight={"1.5em"}
        >
          {data.map((index) => (
            <Fragment key={index}>
              <Flex flex="1" gap="4" alignItems="flex-start" flexWrap="wrap">
                <Link to="/user/jacob-warren">
                  <Avatar size={"sm"} name="Jacob Warren" src="AvatarPic" />
                </Link>

                <Box>
                  <Heading size="xs"
                    color={"#0009"}
                    _hover={{
                      textDecoration: "underline"
                    }}>
                    <Link to="/user/jacob-warren">Jacob Warren</Link>
                  </Heading>
                  <Text fontSize={"13px"} color={"#0009"}>Author CEO at di</Text>

                  <Text mb={"15px"} fontSize={"13px"} color={"#0009"}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis animi veritatis itaque tempore ab aut.</Text>
                </Box>
              </Flex>
            </Fragment>
          ))}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default RepliesCard;
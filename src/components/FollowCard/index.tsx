import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react'

import { colors } from '../../colors'
import { Button } from '@components/index'
import AvatarPic from '@assets/images/avatar.jpg'

const FollowCard: FunctionComponent = () => {
  const data = [1, 2, 3];

  return (
    <Card>
      <CardHeader pb={"4px"}>
        <Heading size={"sm"}>People to follow</Heading>
      </CardHeader>

      <CardBody>
        {data.map((index) => (
          <Flex key={index} mb={"8px"}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar size={"sm"} name="Justice Chimobi" src={AvatarPic} />

              <Box>
                <Heading size="xs">Justice Chimobi</Heading>
                <Text fontSize={"13px"} color={"#0009"}>Developer at Retailloop</Text>
              </Box>
            </Flex>
            
            <Button
              size="sm"
              rounded="lg"
              type="button"
              variant="outline"

            >
              follow
            </Button>
          </Flex>
        ))}
        
        <Link to="/follow/people">
          <Text 
            fontSize={"13px"} 
            color={colors.primary} 
            mt={"20px"} 
            _hover={{
              color: "#101828",
              textDecoration: "underline"
            }}
          >
            See more suggestions
          </Text>
        </Link>
      </CardBody>
    </Card>
  )
}

export default FollowCard;
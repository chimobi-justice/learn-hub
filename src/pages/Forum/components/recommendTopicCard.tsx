import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Tag,
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react'

import { colors } from '../../../colors'

const RecommendTopicCard = () => {
  const data = [1, 2, 3, 4, 5];

  return (
    <Card>
      <CardHeader pb={"4px"}>
        <Heading size={"sm"}>Recommended topics</Heading>
      </CardHeader>

      <CardBody>
        <Wrap>
          {data.map((index) => (
            <WrapItem key={index}>
              <Link to="/topics/programming">
                <Tag size={"sm"} p={"7px"} variant='solid' bg={colors.primary}>
                  programming
                </Tag>
              </Link>
            </WrapItem>
          ))}
        </Wrap>

        <Link to="/topics/programming">
          <Text 
            fontSize={"13px"} 
            color={colors.primary} 
            mt={"20px"} 
            _hover={{
              color: "#101828",
              textDecoration: "underline"
            }}
          >
            See more topics
          </Text>
        </Link>
      </CardBody>
    </Card>
  )
}

export default RecommendTopicCard;
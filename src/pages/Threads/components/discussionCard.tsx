import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'

import truncate from '@helpers/truncate'

const DiscussionCard: FunctionComponent = () => {
  const data = [1, 2, 3];
  return (
    <Card>
      <CardHeader pb={"4px"}>
        <Heading size={"sm"}>Top Discussions this week</Heading>
      </CardHeader>

      <CardBody>
        <Stack
          divider={<StackDivider />}
          spacing={4}
          lineHeight={"1.5em"}
        >
          {data.map((index) => (
            <Box key={index}>
              <Text
                fontSize={"13px"}
                fontWeight={"300"}
              >
                {truncate("Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum alias corporis quae sed illum sunt!", 70)}
              </Text>

              <Link to="hhs">
                <Text
                  as="span"
                  display={"flex"}
                  alignItems={"center"}
                  fontSize={"13px"}
                  fontWeight={"bold"}
                  mt={"3px"}

                  gap={2}
                  _hover={{
                    textDecoration: "underline"
                  }}
                >
                  Details <FaArrowRight color="#0009" />
                </Text>
              </Link>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default DiscussionCard;
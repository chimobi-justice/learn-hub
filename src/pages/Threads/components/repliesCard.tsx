import { Fragment, FunctionComponent } from 'react'
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

import ContentBlockContent from '@components/CodeBlockContent'
import { IThreadRepliesCardProps } from 'src/types'

const RepliesCard: FunctionComponent<IThreadRepliesCardProps> = ({ data }) => {
  return (
    <Card mt={"20px"} ml={{ base: "12px", md: "35px" }}>
      <CardHeader pb={"4px"}>
        <Heading size={"sm"}>Replies</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing={4} lineHeight={"1.5em"}>
          {data?.map((comment: any, index: any) => (
            <Fragment key={index}>
              <Flex flex="1" gap={2} alignItems="flex-start" flexWrap="wrap">
                <Link to={`/user/${comment?.user?.username}`}>
                  <Avatar
                    size={"xs"}
                    name={comment?.user?.fullname}
                    src={comment?.user?.avatar}
                  />
                </Link>

                <Box>
                  <Text
                    fontSize={"13px"}
                    color={"#000"}
                    _hover={{
                      textDecoration: "underline"
                    }}
                  >
                    <Link to={`/user/${comment?.user?.username}`}> {comment?.user?.fullname}</Link>
                  </Text>
                </Box>

                <Box>
                  <Text fontSize={"12px"} color={"#0009"}>
                    <Text as={"span"} mr={"3px"}>Replied</Text>  {comment?.created_at?.human}
                  </Text>
                </Box>
              </Flex>

              <ContentBlockContent content={comment.comment} />
              
            </Fragment>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default RepliesCard;

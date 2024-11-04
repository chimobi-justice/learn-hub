import { FunctionComponent } from 'react'
import { Card, CardBody, CardHeader, Heading, Stack, StackDivider } from '@chakra-ui/react'

import { IThreadRepliesCardProps } from 'src/types'
import CommentComponent from '@pages/Threads/components/commentComponent'

const RepliesCard: FunctionComponent<IThreadRepliesCardProps> = ({ data }) => {
  return (
    <Card mt={"20px"} ml={{ base: "12px", md: "35px" }}>
      <CardHeader pb={"4px"}>
        <Heading size={"sm"}>Replies</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing={4} lineHeight={"1.5em"}>
          {data?.map((comment: any) => (
            <CommentComponent key={comment.id} comment={comment} level={0} />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default RepliesCard;

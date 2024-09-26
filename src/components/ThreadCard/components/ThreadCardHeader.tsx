import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import truncate from '@helpers/truncate';

interface ThreadCardHeaderProps {
  author: {
    fullname: string;
    username: string;
    avatar: string;
  };
  createdAt: string;
}

const ThreadCardHeader: FunctionComponent<ThreadCardHeaderProps> = ({ author, createdAt }) => (
  <Flex flex="1" gap={2} alignItems="center" flexWrap="wrap" mt={"15px"}>
    <Link to={`/user/${author?.username}`}>
      <Avatar size="xs" name={author?.fullname} src={author?.avatar} />
    </Link>
    <Text fontSize="12px" color="#0009" _hover={{ textDecoration: 'underline' }}>
      <Link to={`/user/${author?.username}`}>By: {truncate(author?.fullname, 20)}</Link>
    </Text>
    <Text fontSize="12px" fontWeight="300" color="#0009">
      <Text as="span" color="#000" mr="2px">posted</Text> {createdAt}
    </Text>
  </Flex>

);

export default ThreadCardHeader;

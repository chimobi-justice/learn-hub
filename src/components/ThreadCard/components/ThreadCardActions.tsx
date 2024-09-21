import { Link } from 'react-router-dom'
import { Box, Flex } from '@chakra-ui/react'
import { MdDeleteOutline } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'
import { FunctionComponent } from 'react'

interface ThreadCardActionsProps {
  threadId: string;
  handleDelete: (id: string) => void;
}

const ThreadCardActions: FunctionComponent<ThreadCardActionsProps> = ({ threadId, handleDelete }) => (
  <Flex p="5px" gap={2}>
    <Box>
      <Link to={`/threads/edit/${threadId}`}>
        <CiEdit size="25px" cursor="pointer" />
      </Link>
    </Box>
    <Box>
      <MdDeleteOutline size="25px" color="red" cursor="pointer" onClick={() => handleDelete(threadId)} />
    </Box>
  </Flex>
);

export default ThreadCardActions;

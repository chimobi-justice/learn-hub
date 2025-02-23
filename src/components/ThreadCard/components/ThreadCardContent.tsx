import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading } from '@chakra-ui/react'

import { CodeBlockContent } from '@components/index'
import truncate from '@helpers/truncate'

interface ThreadCardContentProps {
  title: string;
  content: string;
  slug: string;
  threadId: string;
  isSingleView: boolean;
}

const ThreadCardContent: FunctionComponent<ThreadCardContentProps> = ({
  title,
  content,
  slug,
  threadId,
  isSingleView
}) => (
  <Box my="14px">
    <Link to={`/threads/${slug}/${threadId}`}>
      <Heading as="h6" size="md">
        {title}
      </Heading>
    </Link>

    <Box height={isSingleView ? "auto" : "130px"} overflow={isSingleView ? "" : "hidden"} p="5px">
      <CodeBlockContent content={isSingleView ? content : truncate(content, 250)} />
    </Box>
  </Box>
);

export default ThreadCardContent;

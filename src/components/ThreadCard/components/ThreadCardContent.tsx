import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading } from '@chakra-ui/react'

import { ContentBlockContent } from '@components/index'
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
    <Heading as="h6" size="xs">
      <Link to={`/threads/${slug}/${threadId}`}>{title}</Link>
    </Heading>
    <Link to={`/threads/${slug}/${threadId}`}>
      <Box height={isSingleView ? "auto" : "130px"} overflow={isSingleView ? "" : "hidden"} p="5px">
        <ContentBlockContent content={isSingleView ? content : truncate(content, 250)} />
      </Box>
    </Link>
  </Box>
);

export default ThreadCardContent;

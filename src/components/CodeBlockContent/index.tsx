import { FunctionComponent, useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import hljs from 'highlight.js'

import { stripTags } from '@helpers/stripTags'

interface ContentBlockContentProps {
  content: string;
}

const ContentBlockContent: FunctionComponent<ContentBlockContentProps> = ({ content }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll('pre').forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [content]);

  return (
    <Box
      ref={contentRef}
      py={"25px"}
      dangerouslySetInnerHTML={stripTags(content)}
      lineHeight={"2.3em"}

      sx={{
        'pre': {
          padding: '20px',
          borderRadius: '6px',
          overflowX: 'auto',
        },
      }}
    />
  );
};

export default ContentBlockContent;

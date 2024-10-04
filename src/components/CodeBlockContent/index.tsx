import { FunctionComponent, useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import hljs from 'highlight.js'

import { stripTags } from '@helpers/stripTags'

interface ContentBlockContentProps {
  content: string;
  fontSize?: string;
}

const ContentBlockContent: FunctionComponent<ContentBlockContentProps> = ({ content, fontSize }) => {
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
      py={"20px"}
      dangerouslySetInnerHTML={stripTags(content)}
      lineHeight={"2.3em"}
      fontSize={fontSize || "16px"}

      sx={{
        'pre': {
          padding: '20px',
          borderRadius: '6px',
          overflowX: 'auto',
          fontSize: '13px'
        },
        'blockquote': {
          borderLeft: '3px solid grey',
          pl: '15px'
        },
        'a': {
          color: 'blue',
          textDecoration: 'underline'
        }
      }}
    />
  );
};

export default ContentBlockContent;

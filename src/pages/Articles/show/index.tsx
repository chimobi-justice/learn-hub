// import React from 'react';
import { Box, Stack, Text } from '@chakra-ui/react'
import { MdOutlineQuickreply, MdOutlineThumbUp } from 'react-icons/md'
import Markdown from 'react-markdown'

import ArticleHeroSection from '@pages/Articles/HeroSection'
import { CodeHighlight } from '@constant/Code'

// import 'highlight.js/styles/github.css';
// import hljs from 'highlight.js';

// const CodeBlock = ({ language, value }: { language: any, value: any }) => {
//   const ref = React.useRef(null);

//   React.useEffect(() => {
//     if (ref.current) {
//       hljs.highlightElement(ref.current);
//     }
//   }, [value, language]);

//   return (
//     <pre>
//       <code ref={ref} className={`language-${language}`}>
//         {value}
//       </code>
//     </pre>
//   );
// };


const ShowArticle = () => {
  return (
    <Box>
      <ArticleHeroSection
        title="2024 lorem ipsum dolor sit amet consectetur adipisicing elit Minima nemo"
        authorAvatar=""
        authorName="Droney Abah"
        authorUsername="droney-abah"
        date="1 week ago"
      />

      <Box
        width={"100%"}
        maxWidth={{ base: "90%", md: "80%", lg: "70%" }}
        m={"2em auto"}
        py={"30px"}
        display={"flex"}
        flexDir={{ base: "column-reverse", md: "row" }}
        gap={"10"}
      >
        <Box width={{ base: "100%", md: "20%" }}>
          <Stack
            spacing={5}
            direction={{ base: "row", md: "column" }}
          >
            <Text
              fontSize={{ base: "15px", md: "18px" }}
              display={"flex"}
              flexDir={{ base: "row", md: "column" }}
              gap={3}
              alignItems={"center"}
            >
              <MdOutlineQuickreply style={{ fontSize: "24px", marginBottom: "5px" }} /> 30
            </Text>
            <Text
              fontSize={"18px"}
              display={"flex"}
              flexDir={{ base: "row", md: "column" }}
              gap={3}
              alignItems={"center"}
            >
              <MdOutlineThumbUp style={{ fontSize: "24px", marginBottom: "5px" }} /> 60
            </Text>
          </Stack>
        </Box>

        <Box width={{ base: "100%", md: "80%" }}>
          {/* <Markdown
            children={CodeHighlight}
            components={{
              code({ node, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');

                return match ? (
                  <CodeBlock
                    language={match[1]}
                    value={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          /> */}

          <Markdown>{CodeHighlight}</Markdown>
        </Box>
      </Box>
    </Box>
  )
}

export default ShowArticle
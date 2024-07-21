import { Box, Stack, Text } from '@chakra-ui/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { MdOutlineQuickreply, MdOutlineThumbUp } from 'react-icons/md'

import ArticleHeroSection from '@pages/Articles/HeroSection'
import { CodeHighlight } from '@constant/Code'

const ShowSingleArticle = () => {
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
          <SyntaxHighlighter style={darcula}>
            {CodeHighlight}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Box>
  )
}

export default ShowSingleArticle
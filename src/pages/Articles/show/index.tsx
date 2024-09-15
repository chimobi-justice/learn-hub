import { FunctionComponent } from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'
import { MdOutlineQuickreply, MdOutlineThumbUp } from 'react-icons/md'

import ArticleHeroSection from '@pages/Articles/HeroSection'
import { useGetSingleArticle } from '@hooks/article/useGetSingleArticle'
import { useParams } from 'react-router-dom'
import { stripTags } from '@helpers/stripTags'

const ShowArticle: FunctionComponent = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleArticle(id);

  return (
    <Box>
      {isLoading && (
        <p>loading..</p>
      )}

      {data && (
        <>
          <ArticleHeroSection
            title={data?.data.title}
            authorAvatar={data?.data.author.fullname}
            authorName={data?.data.author.fullname}
            authorUsername={data?.data.author.fullname}
            date={data?.data.created_at.human}
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
                  fontSize={{ base: "15px", md: "18px" }}
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
              <Box dangerouslySetInnerHTML={stripTags(data?.data.content)}/>
            </Box>
          </Box>
        </>
      )}

    </Box>
  )
}

export default ShowArticle
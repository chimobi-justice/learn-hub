import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Grid, GridItem, Heading } from '@chakra-ui/react'

import { LatestArticleCard } from '@components/index'
import { useGetRelatedArticles } from '@hooks/article/useGetRelatedAuthorArticles'
import { IArticles } from 'src/types'

const RelatedArticles: FunctionComponent = () => {
  const { id } = useParams();
  const { data: relatedArticles, isSuccess } = useGetRelatedArticles(id!)

  return (
    <Box width="100%" maxWidth={{ base: '90%', lg: '60%' }} m="2em auto" px="10px">
      {relatedArticles && isSuccess && relatedArticles?.data.length > 0 && (
        <>
          <Heading size={"sm"} p={"10px"}>More articles from this author</Heading>
          
          <Box>
          <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={{ base: "10px", md: "15px", lg: "20px" }}
              px={{ base: "6px", md: "10px", lg: "15px" }}
              py="40px"
            >
              {relatedArticles?.data.map((article: IArticles, index: any) => (
                <GridItem key={index} w="100%" h="100%">
                  <LatestArticleCard
                    articleImage={article?.thumbnail}
                    date={article?.created_at?.human}
                    title={article?.title}
                    description={article?.content}
                    CTA={`/articles/${article?.slug}/${article?.id}`}
                    CTAText="Read article"
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  )
}

export default RelatedArticles;
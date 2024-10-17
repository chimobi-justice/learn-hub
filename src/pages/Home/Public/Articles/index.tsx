import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'

import { Button, LatestArticleCard, Skeleton } from '@components/index'
import { colors } from '../../../../colors'
import { useGetArticles } from '@hooks/article/useGetArticles'
import { IArticles } from 'src/types'

const HomeArticles: FunctionComponent = () => {
  const { data: articles, isLoading, isSuccess } = useGetArticles(6)

  return (
    <Box width={"90%"} m={"4rem auto"}>
      <Heading
        pt={"4rem"}
        pb={"2rem"}
      >
        Lat<Text as="span" color={colors.primary}>est</Text> Ar<Text as="span" color={colors.primary}>tic</Text>les
      </Heading>

      {isLoading && <Skeleton />}

      {articles && isSuccess && (
        <>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={{ base: "10px", md: "15px", lg: "20px" }}
            px={{ base: "6px", md: "10px", lg: "15px" }}
            py="40px"
          >
            {articles?.data?.map((article: IArticles, index: number) => (
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

          <Box my={"3.5rem"} textAlign={"center"}>
            <Link to="/articles">
              <Button
                variant="solid"
                size="lg"
                type="button"
                fontWeight={"semibold"}
                rounded="sm"
                rightIcon={<FaArrowRight />}
              >
                View all articles
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Box>
  )
}

export default HomeArticles;
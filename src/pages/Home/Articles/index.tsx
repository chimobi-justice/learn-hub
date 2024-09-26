import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'

import { Button, LatestArticleCard, Skeleton } from '@components/index'
import { colors } from '../../../colors'
import { useGetArticles } from '@hooks/article/useGetArticles'

const HomeArticles: FunctionComponent = () => {
  const { data: articles, isLoading, isSuccess } = useGetArticles(8)

  return (
    <Box width={"90%"} m={"4rem auto"}>
      <Heading
        pt={"4rem"}
        pb={"2rem"}
      >
        Lat<Text as="span" color={colors.primary}>est</Text> Ar<Text as="span" color={colors.primary}>tic</Text>les
      </Heading>

      {articles && isSuccess && (
        <>
          <SimpleGrid minChildWidth="300px" spacing={3}>
            {articles?.map((article: any, index: any) => (
              <LatestArticleCard
                key={index}
                articleImage={article?.thumbnail}
                date={article?.created_at?.human}
                title={article?.title}
                description={article?.content}
                CTA={`/articles/${article?.slug}/${article?.id}`}
                CTAText='Read article'
              />
            ))}
          </SimpleGrid>

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

{isLoading && <Skeleton />}

    </Box>
  )
}

export default HomeArticles;
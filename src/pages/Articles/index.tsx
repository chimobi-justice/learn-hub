import { Fragment, FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react'

import {
  LatestArticleCard,
  FollowCard,
  RecommendTopicCard,
  ArticlesCard,
  Button,
  Alert
} from '@components/index'
import { useUser } from '@context/userContext';
import { useGetPaginatedArticles } from '@hooks/article/useGetPaginatedArticles';
import { useDeleteArticle } from '@hooks/article/useDeleteArticle';

const Articles: FunctionComponent = () => {
  const { user } = useUser();
  const {
    articles,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetPaginatedArticles(10)
  const { deleteArticleMutation } = useDeleteArticle()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletingArticleId, setDeletingArticleId] = useState(null);

  const CardLatestData = [1, 2, 3];

  const handleDelete = (articleId: any) => {
    setDeletingArticleId(articleId)
    onOpen()
  }

  const handleDeleteArticle = () => {
    if (!deletingArticleId) return;
    deleteArticleMutation.mutate(deletingArticleId)
    onClose()
  }

  return (
    <Box
      width={"90%"}
      m={"4rem auto"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
      >
        <Heading pb={"15px"} size={"xl"}>Articles</Heading>

        {user && (
          <Box mb={"15px"}>
            <Link to="/articles/new">
              <Button
                variant="solid"
                size={{ base: "md", lg: "lg" }}
                width={{ base: "100%", lg: "auto" }}
                type="button"
                fontWeight={"semibold"}
                rounded="sm"
              >
                Create Articles
              </Button>
            </Link>
          </Box>
        )}
      </Box>

      <SimpleGrid minChildWidth="300px" spacing={3}>
        {CardLatestData?.map((index) => (
          <LatestArticleCard
            key={index}
            articleImage='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            date='1 week ago'
            title='lorem ipsum dolor'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum molestiae nihil adipisci tenetur vitae impedit.'
            CTA='/articles/lorem-ipsum-dolor'
            CTAText='Read article'
          />
        ))}
      </SimpleGrid>

      <Box
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
        gap={5}
        my={"3rem"}
      >
        <Box width={{ base: "100%", md: "70%" }}>
          {isLoading && <p>loading..</p>}

          {articles && isSuccess && articles?.map((page: any, pageIndex: any) => (
            <Fragment key={pageIndex}>
              {page?.data?.articles.map((article: any, index: any) => (
                <ArticlesCard
                  key={index}
                  id={article?.id}
                  articleImg={article?.thumbnail}
                  title={article?.title}
                  description={article?.content}
                  CTA={`/articles/${article?.slug}/${article?.id}`}
                  isOwner={article?.isOwner}
                  authorAvatar={article?.author?.fullname}
                  authorUsername={article?.author?.username}
                  authorOccupation={article?.author?.profile_headlines}
                  onDelete={() => handleDelete(article.id)}
                />
              ))}
            </Fragment>
          ))}

          {hasNextPage && (
            <Box textAlign={"center"} mt={"25px"}>
              <Button
                size="lg"
                rounded="md"
                type="button"
                variant="solid"
                onClick={fetchNextPage}
                isDisabled={!hasNextPage && isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? "Loading more.."
                  : hasNextPage
                    ? "Load More"
                    : "Nothing more to load"
                }
              </Button>
            </Box>
          )}
        </Box>

        <Box width={{ base: "100%", md: "30%" }}>
          <Box>
            <RecommendTopicCard />
          </Box>

          <Box mt={"15px"}>
            <FollowCard />
          </Box>
        </Box>

        <Alert
          isOpen={isOpen}
          onClose={onClose}
          alertHeader="Delete Article"
          alertBody="Are you sure? You can't undo this action afterwards."
          handleDelete={handleDeleteArticle}
          isLoading={deleteArticleMutation.isPending}
        />
      </Box>
    </Box>
  )
}

export default Articles;
import { Fragment, FunctionComponent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Box,
  Heading,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { FollowCard, Button, ArticlesCard, Alert, Skeleton, EmptyState, NotFound } from '@components/index'
import { useGetAuthoredArticles } from '@hooks/article/useGetAuthoredArticles'
import { useDeleteArticle } from '@hooks/article/useDeleteArticle'

const ArthoredArticles: FunctionComponent = () => {
  const { username } = useParams();

  const {
    articles,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    dataStatus
  } = useGetAuthoredArticles(25, username!)
  const { deleteArticleMutation } = useDeleteArticle()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletingArticleId, setDeletingArticleId] = useState(null);

  const handleDelete = (articleId: any) => {
    setDeletingArticleId(articleId)
    onOpen()
  }

  const handleDeleteArticle = () => {
    if (!deletingArticleId) return;
    deleteArticleMutation.mutate(deletingArticleId)
    onClose()
  }

  if (dataStatus === 404) return <NotFound />;

  return (
    <>
      <Helmet>
        <title>{`${username} - aricles | learn-hub`}</title>
      </Helmet>
      
      <Box
        m={"3rem auto"}
        width={"90%"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"center"}
        >
          <Heading as="h4" size="lg" py={"20px"}>My Articles</Heading>

          <Stack
            spacing={4}
            direction={{ base: "column", md: "row" }}
            mb={{ base: "15px", md: "0px"}}
            width={{ base: "100%", md: "auto" }}
          >
            <Link to="/threads/new">
              <Button
                variant="outline"
                size={{ base: "md", lg: "lg" }}
                width={{ base: "100%", lg: "auto" }}
                type="button"
                fontWeight={"semibold"}
                rounded="lg"
              >
                Create Threads
              </Button>
            </Link>

            <Link to="/articles/new">
              <Button
                variant="solid"
                size={{ base: "md", lg: "lg" }}
                width={{ base: "100%", lg: "auto" }}
                type="button"
                fontWeight={"semibold"}
                rounded="lg"
              >
                Write Articles
              </Button>
            </Link>
          </Stack>
        </Box>

        <Box
          display={"flex"}
          alignItems={"flex-start"}
          flexDirection={{ base: "column", md: "row" }}
          gap={5}
        >
          <Box width={{ base: "100%", md: "70%" }}>
            <Box>
              {isLoading && <Skeleton count={3} />}

              {articles && isSuccess && articles?.map((page: any, pageIndex: number) => (
                <Fragment key={pageIndex}>
                  {page?.data?.articles.map((article: any, index: number) => (
                    <ArticlesCard
                      key={index}
                      id={article?.id}
                      articleImg={article?.thumbnail}
                      title={article?.title}
                      description={article?.content}
                      CTA={`/articles/edit/${article?.id}`}
                      isOwner={article?.can_edit_delete}
                      onDelete={() => handleDelete(article.id)}
                    />
                  ))}

                  {!isLoading && isSuccess && page?.data?.articles?.length === 0 && (
                    <EmptyState title="You don't have any articles yet" />
                  )}
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
          </Box>

          <Box width={{ base: "100%", md: "30%" }}>
            {/* <Box>
            <RecommendTopicCard />
          </Box> */}

            <Box>
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
    </>
  )
}

export default ArthoredArticles;
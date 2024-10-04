import { Fragment, FunctionComponent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import {
  LatestArticleCard,
  FollowCard,
  // RecommendTopicCard,
  ArticlesCard,
  Button,
  Alert,
  Skeleton
} from '@components/index'
import { useUser } from '@context/userContext'
import { useGetPaginatedArticles } from '@hooks/article/useGetPaginatedArticles'
import { useDeleteArticle } from '@hooks/article/useDeleteArticle'
import { useGetPinnedArticles } from '@hooks/article/useGetPinnedArticles'
import { useCreateSaveArticle } from '@hooks/article/useCreateSaveArticles'
import { useDeleteSaveArticle } from '@hooks/article/useDeleteSavaArticles'

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
  const { data: pinArticles } = useGetPinnedArticles();
  const { createSaveArticleMutation } = useCreateSaveArticle();
  const { deleteSaveArticleMutation } = useDeleteSaveArticle()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteArticleId, setDeleteArticleId] = useState(null);

  const handleDelete = (articleId: any) => {
    setDeleteArticleId(articleId)
    onOpen()
  }

  const handleDeleteArticle = () => {
    if (!deleteArticleId) return;
    deleteArticleMutation.mutate(deleteArticleId)
    onClose()
  }

  const handleSaveUnsavedArticle = (articleId: string, is_saved: boolean) => {
    if (is_saved) {
      unsaveArticle(articleId);
    } else {
      saveArticle(articleId);
    }
  }

  const saveArticle = (articleId: string) => {
    createSaveArticleMutation.mutate(articleId);
  };

  const unsaveArticle = (articleId: string) => {
    deleteSaveArticleMutation.mutate(articleId);
  };

  return (
    <>
      <Helmet>
        <title>Articles | learn-hub</title>
        <meta name="description" content="Get Lists of Articles." />
      </Helmet>

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

        <SimpleGrid minChildWidth="250px" spacing={3}>
          {pinArticles?.map((article: any, index: number) => (
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

        <Box
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
          flexDir={{ base: "column", md: "row" }}
          gap={5}
          my={"3rem"}
        >
          <Box width={{ base: "100%", md: "70%" }}>
            {isLoading && <Skeleton />}

            {articles && isSuccess && articles?.map((page: any, pageIndex: number) => (
              <Fragment key={pageIndex}>
                {page?.data?.articles.map((article: any, index: number) => (
                  <ArticlesCard
                    key={index}
                    id={article?.id}
                    articleImg={article?.thumbnail}
                    title={article?.title}
                    description={article?.content}
                    read_time={article?.read_time}
                    CTA={`/articles/${article?.slug}/${article?.id}`}
                    isOwner={article?.isOwner}
                    authorAvatar={article?.author?.avatar}
                    authorFullname={article?.author?.fullname}
                    authorUsername={article?.author?.username}
                    onDelete={() => handleDelete(article?.id)}
                    isLoggedIn={!!user}
                    is_saved={article?.is_saved}
                    saveUnsavedArticle={() => handleSaveUnsavedArticle(article?.id, article?.is_saved)}
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
            {/* <Box>
            <RecommendTopicCard />
          </Box> */}

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
    </>
  )
}

export default Articles;
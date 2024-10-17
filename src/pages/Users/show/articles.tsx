import { Fragment, FunctionComponent, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Heading, useDisclosure } from '@chakra-ui/react'

import { Alert, ArticlesCard, Button, Skeleton } from '@components/index'
import { useGetPublicAuthoredArticles } from '@hooks/article/useGetPublicAuthoredArticles'
import { useDeleteArticle } from '@hooks/article/useDeleteArticle'
import { useUser } from '@context/userContext'
import { useCreateSaveArticle } from '@hooks/article/useCreateSaveArticles'
import { useDeleteSaveArticle } from '@hooks/article/useDeleteSavaArticles'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'
import { ArticleData } from 'src/types'

const PublicUserArticles: FunctionComponent = () => {
  const { username } = useParams();

  const { user } = useUser();
  const {
    articles,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetPublicAuthoredArticles(25, username!);
  const { deleteArticleMutation } = useDeleteArticle()
  const { createSaveArticleMutation } = useCreateSaveArticle();
  const { deleteSaveArticleMutation } = useDeleteSaveArticle();
  const { createFollowUserMutation } = useCreateFollowUser()
  const { createOnFollowUserMutation } = useCreateOnFollowUser();
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
      deleteSaveArticleMutation.mutate(articleId);
    } else {
      createSaveArticleMutation.mutate(articleId);
    }
  }

  const handleFollowUnfollow = (userId: string, following: boolean) =>  {
    if (following) {
      createOnFollowUserMutation.mutate(userId)
    } else {
      createFollowUserMutation.mutate(userId)
    }
  }

  return (
    <>
      {isLoading && <Skeleton />}

      {articles && isSuccess && articles?.map((page: any, pageIndex: number) => (
        <Fragment key={pageIndex}>
          {page?.data?.articles.map((article: ArticleData, index: number) => (
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
              is_following={article?.author?.is_following}
              followUser={() => handleFollowUnfollow(article?.author?.id, article?.author?.is_following)}
              saveUnsavedArticle={() => handleSaveUnsavedArticle(article?.id, article?.is_saved)}
            />
          ))}

          {page?.data?.articles?.length === 0 && (
            <Box textAlign="center" mt="20px">
              <Heading as="h5" size="md">This author don't have any articles yet</Heading>
            </Box>
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

      <Alert
        isOpen={isOpen}
        onClose={onClose}
        alertHeader="Delete Article"
        alertBody="Are you sure? You can't undo this action afterwards."
        handleDelete={handleDeleteArticle}
        isLoading={deleteArticleMutation.isPending}
      />
    </>

  )
}

export default PublicUserArticles;
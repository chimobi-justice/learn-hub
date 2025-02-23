import { Fragment, useState } from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'

import { Alert, ArticlesCard, Button, Skeleton } from '@components/index'
import { useUser } from '@context/userContext'
import { useDeleteArticle } from '@hooks/article/useDeleteArticle'
import { useGetRecommentedArticles } from '@hooks/article/useGetRecommentedArticles'
import { useCreateSaveArticle } from '@hooks/article/useCreateSaveArticles'
import { useDeleteSaveArticle } from '@hooks/article/useDeleteSavaArticles'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'
import { ArticleData } from 'src/types'

const ForYou = () => {
  const { user } = useUser();
  const { articles, isLoading, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetRecommentedArticles(20)
  const { deleteArticleMutation } = useDeleteArticle()
  const { createSaveArticleMutation } = useCreateSaveArticle();
  const { deleteSaveArticleMutation } = useDeleteSaveArticle();
  const { createFollowUserMutation } = useCreateFollowUser();
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
    is_saved ? deleteSaveArticleMutation.mutate(articleId) : createSaveArticleMutation.mutate(articleId);
  };

  const handleFollowUnfollow = (userId: string, following: boolean | undefined) => {
    following ? createOnFollowUserMutation.mutate(userId) : createFollowUserMutation.mutate(userId);
  };

  return (
    <>
      {isLoading && <Skeleton count={3} />}

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

export default ForYou;
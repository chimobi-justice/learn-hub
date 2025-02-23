import { Fragment, FunctionComponent } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import { ArticlesCard, Button, Skeleton } from '@components/index'
import { useUser } from '@context/userContext'
import { useGetFollowUsersArticles } from '@hooks/user/useGetFollowUserArticles'
import { useCreateSaveArticle } from '@hooks/article/useCreateSaveArticles'
import { useDeleteSaveArticle } from '@hooks/article/useDeleteSavaArticles'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'

interface FollowingProps {
  setTabIndex: (index: number) => void;
}

const Following: FunctionComponent<FollowingProps> = ({ setTabIndex }) => {
  const { user } = useUser();
  const { articles, isSuccess, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetFollowUsersArticles(25);
  const { createSaveArticleMutation } = useCreateSaveArticle();
  const { deleteSaveArticleMutation } = useDeleteSaveArticle();
  const { createFollowUserMutation } = useCreateFollowUser()
  const { createOnFollowUserMutation } = useCreateOnFollowUser();

  const handleSaveUnsavedArticle = (articleId: string, is_saved: boolean) => {
    is_saved ? deleteSaveArticleMutation.mutate(articleId) : createSaveArticleMutation.mutate(articleId);
  };

  const handleFollowUnfollow = (userId: string, following: boolean) => {
    following ? createOnFollowUserMutation.mutate(userId) : createFollowUserMutation.mutate(userId);
  };

  return (
    <>
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
              read_time={article?.read_time}
              CTA={`/articles/${article?.slug}/${article?.id}`}
              isOwner={article?.isOwner}
              authorAvatar={article?.author?.avatar}
              authorFullname={article?.author?.fullname}
              authorUsername={article?.author?.username}
              isLoggedIn={!!user}
              is_saved={article?.is_saved}
              is_following={article?.is_following}
              followUser={() => handleFollowUnfollow(article?.author?.id, article?.is_following)}
              saveUnsavedArticle={() => handleSaveUnsavedArticle(article?.id, article?.is_saved)}
            />
          ))}

          {page?.data?.articles?.length === 0 && (
            <Box textAlign="center" mt="20px">
              <Heading as="h5" size="sm" fontWeight={"semibold"}>Stories from the authors you follow will appear here.</Heading>

              <Box mt={"25px"}>
                <Button
                  size="sm"
                  rounded="lg"
                  type="button"
                  variant="solid"
                  onClick={() => setTabIndex(0)}
                >
                  Browse recommended stories
                </Button>
              </Box>
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
    </>
  )
}

export default Following;
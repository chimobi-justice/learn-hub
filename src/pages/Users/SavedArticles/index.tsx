import { FunctionComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { ArticlesCard, Button, Skeleton } from '@components/index'
import { useUser } from '@context/userContext'
import { useSavedArticles } from '@hooks/article/useGetSavedArticles'
import { colors } from '../../../colors'
import { useDeleteSaveArticle } from '@hooks/article/useDeleteSavaArticles'
import { ArticleData } from 'src/types'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'

const SavedArticles: FunctionComponent = () => {
  const { user } = useUser();
  const { articles, isLoading, isSuccess, fetchNextPage, isFetchingNextPage, hasNextPage } = useSavedArticles(25);
  const { deleteSaveArticleMutation } = useDeleteSaveArticle();
  const { createFollowUserMutation } = useCreateFollowUser()
  const { createOnFollowUserMutation } = useCreateOnFollowUser();

  const handleFollowUnfollow = (userId: string, following: boolean | undefined) => {
    following ? createOnFollowUserMutation.mutate(userId) : createFollowUserMutation.mutate(userId);
  };

  return (
    <>
      <Helmet>
        <title>{`${user?.data?.fullname} - My reading lists | learn-hub`}</title>
      </Helmet>

      <Container maxW={"container.xl"}>
        <Box
          display={"flex"}
          gap={4}
          my={"15px"}
          flexDirection={{ base: "column-reverse", md: "row" }}
        >
          <Box width={{ base: "100", md: "70%" }}>
            <Flex mt={"15px"} mb={"25px"} align={"center"} gap={2}>
              <Avatar
                src={user?.data?.avatar}
                name={user?.data?.fullname}
                size={"md"}
              />
              <Heading size={"sm"}>{user?.data?.fullname}</Heading>
            </Flex>

            <Box my={"35px"} borderBottom={"1px solid grey"} pb={"7px"}>
              <Heading as={"h3"} size={"lg"}>Reading Lists</Heading>
            </Box>

            <Box>
              {isLoading && <Skeleton />}

              {articles && isSuccess && articles?.map((page: any, pageIndex: number) => (
                <Fragment key={pageIndex}>
                  {page?.data?.articles?.map((article: ArticleData, index: number) => (
                    <ArticlesCard
                      key={index}
                      id={article?.id}
                      articleImg={article?.thumbnail}
                      title={article?.title}
                      description={article?.content}
                      read_time={article?.read_time}
                      CTA={`/articles/${article?.slug}/${article?.id}`}
                      isOwner={article?.isOwner}
                      is_saved={article?.is_saved}
                      authorAvatar={article?.author?.avatar}
                      authorFullname={article?.author?.fullname}
                      authorUsername={article?.author?.username}
                      is_following={article?.author?.is_following}
                      isLoggedIn={!!user}
                      followUser={() => handleFollowUnfollow(article?.author?.id, article?.author?.is_following)}
                      saveUnsavedArticle={() => deleteSaveArticleMutation.mutate(article?.id)}
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
          </Box>

          <Box
            width={{ base: "100", md: "30%" }}
            borderLeft={"2px solid #f1f1f1"}
            p={"10px"}
            position={{ base: "unset", md: "sticky" }}
            top="10px"
            height={{ base: "auto", md: "800px" }}
          >
            <Box p={"5px"}>
              <Avatar
                src={user?.data?.avatar}
                name={user?.data?.fullname}
                size={"2xl"}
              />

              <Text my={"15px"} fontWeight={"bold"}>{user?.data?.fullname}</Text>
              <Text fontSize={"14px"} color={"#0009"} lineHeight={"1.6em"}>{user?.data?.bio}</Text>
              <Text
                color={colors.primary}
                fontSize={"15px"}
                mt={"5px"}
                _hover={{
                  color: colors.primaryDark,
                  textDecoration: "underline"
                }}
              >
                <Link to="/me/settings/account/edit">Edit Profile</Link>
              </Text>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default SavedArticles;
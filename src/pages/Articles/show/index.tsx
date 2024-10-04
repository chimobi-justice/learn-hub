import { FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { GiWorld } from 'react-icons/gi'

import ArticleHeroSection from '@pages/Articles/HeroSection'
import { useGetSingleArticle } from '@hooks/article/useGetSingleArticle'
import truncate from '@helpers/truncate'
import { NotFound, Skeleton } from '@components/index'
import CommentDrawer from '@pages/Articles/components/CommentDrawer'
import { useArticleActions } from '@pages/Articles/hooks/useArticleActions'
import ArticleActionButtons from '../components/ArticleActionButtons'
import ContentBlockContent from '@components/CodeBlockContent'
import { Helmet } from 'react-helmet-async'

const ShowArticle: FunctionComponent = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess, error } = useGetSingleArticle(id!);
  const {
    comment,
    isOpen,
    onClose,
    setComment,
    handleShowComment,
    handleCommentSubmit,
    handleLikeArticle,
    handleDisLikeArticle,
    isSubmittingArticleComment
  } = useArticleActions(id!)

  if (error) return <NotFound />;

  return (
    <>
      {isLoading && <Skeleton />}

      {data && isSuccess && (
        <Box>
          <Helmet>
            <title>{`${data?.data?.title} | learn-hub`}</title>
          </Helmet>

          <>
            <ArticleHeroSection
              title={data?.data?.title}
              authorAvatar={data?.data?.author?.avatar}
              authorName={data?.data?.author?.fullname}
              authorUsername={data?.data?.author?.username}
              read_time={data?.data?.read_time}
              date={data?.data?.created_at?.human}
            />

            <Box
              width={"100%"}
              maxWidth={{ base: "90%", md: "80%", lg: "70%" }}
              m={"2em auto"}
              py={"30px"}
              display={"flex"}
              flexDir={{ base: "column-reverse", md: "row" }}
              gap={"10"}
            >
              <Box width={{ base: "100%", md: "20%" }} textAlign={"center"}>
                <ArticleActionButtons
                  article={data?.data}
                  onLike={handleLikeArticle}
                  onDisLike={handleDisLikeArticle}
                  onShowComment={() => handleShowComment(data?.data?.id)}
                />
              </Box>

              <Box width={{ base: "100%", md: "80%" }}>
                <Box mb={"25px"}>
                  <Image
                    src={data?.data?.thumbnail}
                    width={"100%"}
                    height={"350px"}
                  />
                </Box>

                <ContentBlockContent content={data?.data?.content} />

                <Flex
                  justify={"space-between"}
                  flexDir={{ base: "column", md: "row" }}
                  alignItems={"flex-start"}
                  borderTop={"2px solid gray"}
                  mt={"15px"}
                  py={"15px"}
                >
                  <Box
                    display={"flex"}
                    flexDir={{ base: "column", md: "row" }}
                    textAlign={{ base: "center", md: "initial" }}
                    gap={3}
                  >
                    <Box>
                      <Link to={`/user/${data?.data?.author?.username}`}>
                        <Avatar
                          src={data?.data?.author?.avatar}
                          name={data?.data?.author?.fullname}
                          size={{ base: "xl", md: "2xl" }}
                        />
                      </Link>
                    </Box>

                    <Box>
                      <Text
                        color={"#000"}
                        fontSize={"20px"}
                        mb={"5px"}
                        _hover={{ textDecoration: "underline" }}
                      >
                        <Link to={`/user/${data?.data?.author?.username}`}>
                          {data?.author?.fullname}
                        </Link>
                      </Text>
                      <Text lineHeight={"1.7em"} color={"#0009"}>
                        {truncate(data?.data?.author?.info_details?.bio, 230)}
                      </Text>
                    </Box>
                  </Box>

                  <Box width={{ base: "100%", md: "auto" }}>
                    <HStack
                      spacing={3}
                      my={"10px"}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      {data?.data?.author?.info_details?.gitHub && (
                        <Link
                          to={`https://www.github.com/${data?.data?.author?.info_details?.gitHub}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Text
                            fontSize={{ base: "15px", md: "18px" }}
                          >
                            <FaGithub style={{ fontSize: "24px", marginBottom: "5px" }} />
                          </Text>
                        </Link>
                      )}

                      {data?.data?.author?.info_details?.twitter && (
                        <Link
                          to={`https://x.com/${data?.data?.author?.info_details?.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Text
                            fontSize={{ base: "15px", md: "18px" }}
                          >
                            <FaXTwitter style={{ fontSize: "24px", marginBottom: "5px" }} />
                          </Text>
                        </Link>
                      )}

                      {data?.data?.author?.info_details?.website && (
                        <Link
                          to={`${data?.data?.author?.info_details?.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Text
                            fontSize={{ base: "15px", md: "18px" }}
                          >
                            <GiWorld style={{ fontSize: "24px", marginBottom: "5px" }} />
                          </Text>
                        </Link>
                      )}
                    </HStack>
                  </Box>

                </Flex>
              </Box>
            </Box>
          </>

          <CommentDrawer
            isOpen={isOpen}
            onClose={onClose}
            comment={comment}
            comments={data?.data?.article_comments || []}
            commentCounts={data?.data?.article_comment_counts}
            setComment={setComment}
            handleSubmit={handleCommentSubmit}
            isSubmitting={isSubmittingArticleComment}
          />
        </Box>
      )}
    </>
  )
}

export default ShowArticle;
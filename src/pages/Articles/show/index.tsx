import { FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import ArticleHeroSection from '@pages/Articles/HeroSection'
import CommentDrawer from '@pages/Articles/components/CommentDrawer'
import ArticleActionButtons from '@pages/Articles/components/ArticleActionButtons'
import RelatedArticles from '@pages/Articles/components/RelatedArticles'
import { useArticleActions } from '@pages/Articles/hooks/useArticleActions'

import { CodeBlockContent, NotFound, Skeleton } from '@components/index'
import truncate from '@helpers/truncate'

import { useGetSingleArticle } from '@hooks/article/useGetSingleArticle'
import { useCreateSaveArticle } from '@hooks/article/useCreateSaveArticles'
import { useDeleteSaveArticle } from '@hooks/article/useDeleteSavaArticles'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'
import useScrollToTop from '@hooks/useScrollToTop'
import { useUser } from '@context/userContext'
import { ISocial } from 'src/types'
import { getSocialMediaIcon } from '@helpers/getSocialMediaIcon'

const ShowArticle: FunctionComponent = () => {
  const { id } = useParams();
  const { user } = useUser();
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
    isSubmittingArticleComment,
  } = useArticleActions(id!);
  const { createSaveArticleMutation } = useCreateSaveArticle();
  const { deleteSaveArticleMutation } = useDeleteSaveArticle();
  const { createFollowUserMutation } = useCreateFollowUser();
  const { createOnFollowUserMutation } = useCreateOnFollowUser();

  const handleSaveUnsavedArticle = (articleId: string, is_saved: boolean) => {
    is_saved ? deleteSaveArticleMutation.mutate(articleId) : createSaveArticleMutation.mutate(articleId);
  };

  const handleFollowUnfollow = (userId: string, following: boolean | undefined) => {
    following ? createOnFollowUserMutation.mutate(userId) : createFollowUserMutation.mutate(userId);
  };

  const renderAuthorSocialLinks = () => (
    <HStack spacing={3} my="10px" justify="center">
      {data?.data?.author?.info_details?.socials?.map((social: ISocial) => (
        <Link
          to={social?.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text
            fontSize={{ base: "15px", md: "18px" }}
          >
            {getSocialMediaIcon(social.platform, "24px")}
          </Text>
        </Link>
      ))}
    </HStack>
  );

  const renderAuthorInfo = () => (
    <Flex
      justify="space-between"
      flexDir={{ base: 'column', md: 'row' }}
      alignItems="flex-start"
      borderTop="2px solid gray"
      mt="15px"
      py="15px"
    >
      <Box display="flex" flexDir={{ base: 'column', md: 'row' }} textAlign={{ base: 'center', md: 'initial' }} gap={3}>
        <Link to={`/user/${data?.data?.author?.username}`}>
          <Avatar src={data?.data?.author?.avatar} name={data?.data?.author?.fullname} size={{ base: 'xl', md: '2xl' }} />
        </Link>
        <Box>
          <Link to={`/user/${data?.data?.author?.username}`}>
            <Text color="#000" fontSize="20px" mb="5px" _hover={{ textDecoration: 'underline' }}>
              {data?.data?.author?.fullname}
            </Text>
          </Link>
          <Text lineHeight="1.7em" color="#0009">
            {truncate(data?.data?.author?.info_details?.bio ?? "", 230)}
          </Text>
        </Box>
      </Box>
      <Box width={{ base: '100%', md: 'auto' }}>
        {renderAuthorSocialLinks()}
      </Box>
    </Flex>
  );

  // if clicked related article scroll to top to update the changes on the UI 
  useScrollToTop()

  if (error) return <NotFound />;

  return (
    <>
      {isLoading && <Skeleton count={3} />}

      {data && isSuccess && (
        <Box>
          <Helmet>
            <title>{`${data?.data?.title} | learn-hub`}</title>
          </Helmet>

          <ArticleHeroSection
            title={data?.data?.title}
            isOwner={data?.data?.isOwner}
            read_time={data?.data?.read_time}
            authorAvatar={data?.data?.author?.avatar}
            authorName={data?.data?.author?.fullname}
            authorUsername={data?.data?.author?.username}
            is_following={data?.data?.author?.is_following}
            date={data?.data?.created_at?.human}
            followUser={() => handleFollowUnfollow(data?.data?.author?.id, data?.data?.author?.is_following)}
          />

          <Box width="100%" maxWidth={{ base: '90%', lg: '60%' }} m="2em auto" px="10px">
            <ArticleActionButtons
              article={data?.data}
              onLike={handleLikeArticle}
              onDisLike={handleDisLikeArticle}
              onShowComment={() => handleShowComment(data?.data?.id)}
              isLoggedIn={!!user}
              isOwner={data?.data?.isOwner}
              is_saved={data?.data?.is_saved}
              saveUnsavedArticle={() => handleSaveUnsavedArticle(data?.data?.id, data?.data?.is_saved)}
            />

            <Box>
              <Image src={data?.data?.thumbnail} width="100%" height="350px" mb="25px" />

              <CodeBlockContent content={data?.data?.content} />

              {renderAuthorInfo()}
            </Box>
          </Box>

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

      {data && isSuccess && <RelatedArticles />}
    </>
  );
};

export default ShowArticle;
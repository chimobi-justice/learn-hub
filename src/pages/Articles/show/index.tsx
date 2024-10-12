import { FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { GiWorld } from 'react-icons/gi'
import { Helmet } from 'react-helmet-async'

import ArticleHeroSection from '@pages/Articles/HeroSection'
import CommentDrawer from '@pages/Articles/components/CommentDrawer'
import ArticleActionButtons from '@pages/Articles/components/ArticleActionButtons'
import { useArticleActions } from '@pages/Articles/hooks/useArticleActions'

import { ContentBlockContent, NotFound, Skeleton } from '@components/index'
import truncate from '@helpers/truncate'

import { useGetSingleArticle } from '@hooks/article/useGetSingleArticle'
import { useCreateSaveArticle } from '@hooks/article/useCreateSaveArticles'
import { useDeleteSaveArticle } from '@hooks/article/useDeleteSavaArticles'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'

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
    isSubmittingArticleComment,
  } = useArticleActions(id!);
  const { createSaveArticleMutation } = useCreateSaveArticle();
  const { deleteSaveArticleMutation } = useDeleteSaveArticle();
  const { createFollowUserMutation } = useCreateFollowUser();
  const { createOnFollowUserMutation } = useCreateOnFollowUser();

  const handleSaveUnsavedArticle = (articleId: string, is_saved: boolean) => {
    is_saved ? deleteSaveArticleMutation.mutate(articleId) : createSaveArticleMutation.mutate(articleId);
  };

  const handleFollowUnfollow = (userId: string, following: boolean) => {
    following ? createOnFollowUserMutation.mutate(userId) : createFollowUserMutation.mutate(userId);
  };  

  const renderAuthorSocialLinks = () => (
    <HStack spacing={3} my="10px" justify="center">
      {data?.data?.author?.info_details?.gitHub && (
        <Link to={`https://www.github.com/${data?.data?.author?.info_details?.gitHub}`} target="_blank" rel="noopener noreferrer">
          <FaGithub fontSize="24px" style={{ marginBottom: '5px' }} />
        </Link>
      )}
      {data?.data?.author?.info_details?.twitter && (
        <Link to={`https://x.com/${data?.data?.author?.info_details?.twitter}`} target="_blank" rel="noopener noreferrer">
          <FaXTwitter fontSize="24px" style={{ marginBottom: '5px' }} />
        </Link>
      )}
      {data?.data?.author?.info_details?.website && (
        <Link to={`${data?.data?.author?.info_details?.website}`} target="_blank" rel="noopener noreferrer">
          <GiWorld fontSize="24px" style={{ marginBottom: '5px' }} />
        </Link>
      )}
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
            {truncate(data?.data?.author?.info_details?.bio, 230)}
          </Text>
        </Box>
      </Box>
      <Box width={{ base: '100%', md: 'auto' }}>
        {renderAuthorSocialLinks()}
      </Box>
    </Flex>
  );

  if (error) return <NotFound />;

  return (
    <>
      {isLoading && <Skeleton />}

      {data && isSuccess && (
        <Box>
          <Helmet>
            <title>{`${data?.data?.title} | learn-hub`}</title>
          </Helmet>

          <ArticleHeroSection
            title={data?.data?.title}
            authorAvatar={data?.data?.author?.avatar}
            authorName={data?.data?.author?.fullname}
            authorUsername={data?.data?.author?.username}
            is_following={data?.data?.author?.is_following}
            read_time={data?.data?.read_time}
            date={data?.data?.created_at?.human}
            followUser={() => handleFollowUnfollow(data?.data?.author?.id, data?.data?.author?.is_following)}
          />

          <Box width="100%" maxWidth={{ base: '90%', lg: '60%' }} m="2em auto" px="10px">
            <ArticleActionButtons
              article={data?.data}
              onLike={handleLikeArticle}
              onDisLike={handleDisLikeArticle}
              onShowComment={() => handleShowComment(data?.data?.id)}
              isLoggedIn
              isOwner={data?.data?.isOwner}
              is_saved={data?.data?.is_saved}
              saveUnsavedArticle={() => handleSaveUnsavedArticle(data?.data?.id, data?.data?.is_saved)}
            />

            <Box>
              <Image src={data?.data?.thumbnail} width="100%" height="350px" mb="25px" />

              <ContentBlockContent content={data?.data?.content} />

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
    </>
  );
};

export default ShowArticle;
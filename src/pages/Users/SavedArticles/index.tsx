import { Link } from 'react-router-dom'
import { Avatar, Box, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { ArticlesCard, Skeleton } from '@components/index'
import { useUser } from '@context/userContext'
import { useSavedArticles } from '@hooks/article/useGetSavedArticles'
import { colors } from '../../../colors'
import { useDeleteSaveArticle } from '@hooks/article/useDeleteSavaArticles'

const SavedArticles = () => {
  const { user } = useUser();
  const { data: savedArticles, isLoading } = useSavedArticles();
  const { deleteSaveArticleMutation} = useDeleteSaveArticle()

  const handleUnSaveArticle = (articleId: string) => {
      deleteSaveArticleMutation.mutate(articleId);
  }

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

            {savedArticles && savedArticles?.map((article: any, index: number) => (
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
                saveUnsavedArticle={() => handleUnSaveArticle(article?.id)}
              />
            ))}

            {savedArticles?.length === 0 && (
              <Text>Your saving lists of articles will appear here!</Text>
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
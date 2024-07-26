import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import {
  LatestArticleCard,
  FollowCard,
  RecommendTopicCard,
  ArticlesCard,
  Button
} from '@components/index'
import { Link } from 'react-router-dom';

const Articles = () => {
  const CardLatestData = [1, 2, 3];
  const CardData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box
      width={"90%"}
      m={"4rem auto"}
    >
      <Box 
        display={"flex"} 
        justifyContent={"space-between"}
        flexDir={{base: "column", md: "row"}}
      >
        <Heading pb={"15px"} size={"xl"}>Articles</Heading>

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
      </Box>

      <SimpleGrid minChildWidth="300px" spacing={3}>
        {CardLatestData?.map((index) => (
          <LatestArticleCard
            key={index}
            articleImage='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            date='1 week ago'
            title='lorem ipsum dolor'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum molestiae nihil adipisci tenetur vitae impedit.'
            CTA='/articles/lorem-ipsum-dolor'
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
          {CardData.map((index) => (
            <ArticlesCard
              key={index}
              articleImg="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              title="2024 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, nemo"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. A dolore est modi. 
              Repellendus quisquam, aliquam perspiciatis consequuntur vero quam quibusdam atque dolorem 
              quos dolores, in minima modi deleniti, quae doloribus?
              "
              slug="2024-lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-Minima-nemo"
              authorAvatar=""
              authorUsername="Nelson Dev"
              authorOccupation="Developer at Prembly"
            />
          ))}

          <Box textAlign={"center"} mt={"25px"}>
            <Button
              size="lg"
              rounded="md"
              type="button"
              variant="solid"

            >
              see more
            </Button>
          </Box>
        </Box>

        <Box width={{ base: "100%", md: "30%" }}>
          <Box>
            <RecommendTopicCard />
          </Box>

          <Box mt={"15px"}>
            <FollowCard />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Articles;
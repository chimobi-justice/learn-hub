import { FunctionComponent } from 'react'
import {
  Box,
  Heading,
  Stack,
} from '@chakra-ui/react'

import { RecommendTopicCard, FollowCard, Button, ArticlesCard } from '@components/index'

const UserViews: FunctionComponent = () => {
  const CardData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box
      m={"3rem auto"}
      width={"90%"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"center"}
      >
        <Heading as="h4" size="lg" py={"20px"}>My Stories</Heading>

        <Stack
          spacing={4}
          direction={{ base: "column", md: "row" }}
        >
          <Button
            variant="outline"
            size="md"
            type="button"
            fontWeight={"semibold"}
            rounded="lg"
          >
            Create Threads
          </Button>

          <Button
            variant="solid"
            size="md"
            type="button"
            fontWeight={"semibold"}
            rounded="lg"
          >
            Write Articles
          </Button>
        </Stack>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        flexDirection={{ base: "column", md: "row" }}
        gap={5}
      >
        <Box width={{ base: "100%", md: "70%" }}>
          <Box>
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

export default UserViews;
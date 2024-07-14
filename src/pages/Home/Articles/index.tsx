import { Link } from 'react-router-dom'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'

import { Button, LatestArticleCard } from '@components/index'
import { colors } from '../../../colors'

const HomeArticles = () => {
  const CardData = [1, 2, 3, 4, 5, 6];

  return (
    <Box width={"90%"} m={"4rem auto"}>
      <Heading
        pt={"4rem"}
        pb={"2rem"}
      >
        Lat<Text as="span" color={colors.primary}>est</Text> Ar<Text as="span" color={colors.primary}>tic</Text>les
      </Heading>

      <SimpleGrid minChildWidth="300px" spacing={3}>
        {CardData?.map((index) => (
          <LatestArticleCard
            key={index}
            articleImage='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            date='1 week ago'
            title='lorem ipsum dolor'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum molestiae nihil adipisci tenetur vitae impedit.'
            CTA='/forum/lorem-ipsum-dolor'
            CTAText='Read article'
          />
        ))}
      </SimpleGrid>

      <Box my={"3.5rem"} textAlign={"center"}>
        <Link to="/articles">
          <Button
            variant="solid"
            size="lg"
            type="button"
            fontWeight={"semibold"}
            rounded="sm"
            rightIcon={<FaArrowRight />}
          >
            View all articles
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default HomeArticles;
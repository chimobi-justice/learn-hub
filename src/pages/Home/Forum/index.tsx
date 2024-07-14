import { Link } from 'react-router-dom'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'

import { Button, Card } from '@components/index'
import { colors } from '../../../colors'

const HomeForum = () => {
  const CardData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box width={"90%"} m={"4rem auto"}>
      <Heading
        pt={"4rem"}
        pb={"2rem"}
      >
        Thr<Text as="span" color={colors.primary}>ea</Text>ds
      </Heading>

      <SimpleGrid minChildWidth="300px" spacing={5}>
        {CardData?.map((index) => (
          <Card
            key={index}
            profile=''
            userName='Linda'
            date='1 week ago'
            title='lorem ipsum dolor'
            description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum molestiae nihil adipisci tenetur vitae impedit.'
            CTA='/forum/lorem-ipsum-dolor'
            CTAText='open thread'
          />
        ))}
      </SimpleGrid>

      <Box my={"3.5rem"} textAlign={"center"}>
        <Link to="/forum">
          <Button
            variant="solid"
            size="lg"
            type="button"
            fontWeight={"semibold"}
            rounded="sm"
            rightIcon={<FaArrowRight />}
          >
            View all threads
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default HomeForum;
import { FunctionComponent, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import {
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  Box,
  HStack,
  Text,
  Spacer,
  Avatar,
  Heading
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'

interface IProps {
  profile: string;
  userName: string;
  date: string;
  title: string;
  description: string;
  CTA: string;
  CTAText: string | ReactElement;
}

const Card: FunctionComponent<IProps> = ({
  profile,
  userName,
  date,
  title,
  description,
  CTA = '#',
  CTAText
}) => {
  return (
    <ChakraCard>
      <CardHeader>
        <HStack>
          <Box display={"flex"} gap={2} alignItems={"center"}>
            <Avatar
              size="sm"
              src={profile}
            />

            <Text fontSize={"14px"}>{userName}</Text>
          </Box>

          <Spacer />

          <Text fontSize={"14px"} fontWeight={"300"} color={"#0009"}>{date}</Text>
        </HStack>
      </CardHeader>

      <CardBody>
        <Heading
          as="h5"
          size={"md"}
          mb={"15px"}
          fontWeight={"500"}
          _hover={{
            textDecoration: "underline"
          }}
        >
          <Link to={CTA}>{title}</Link>
        </Heading>

        <Text fontSize={"14px"} fontWeight={"300"}>{description}</Text>
      </CardBody>

      <CardFooter>
        <Link to={CTA}>
          <Text
            as="span"
            display={"flex"}
            alignItems={"center"}
            color={"#0009"}
            gap={3}
            _hover={{
              textDecoration: "underline"
            }}
          >
            {CTAText} <FaArrowRight color="#0009" />
          </Text>
        </Link>
      </CardFooter>
    </ChakraCard>
  )
}

export default Card;
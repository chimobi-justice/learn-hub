import { FunctionComponent, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Image,
  Stack
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'

interface IProps {
  articleImage: string;
  date: string;
  title: string;
  description: string;
  CTA: string;
  CTAText: string | ReactElement;
}

const LatestArticleCard: FunctionComponent<IProps> = ({
  articleImage,
  date,
  title,
  description,
  CTA = '#',
  CTAText
}) => {
  return (
    <Card maxW="sm" bg={"transparent"} boxShadow={"none"}>
      <CardBody>
        <Image
          src={articleImage}
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Text fontSize={"14px"} color={"#0009"}>{date}</Text>
          <Heading 
            as="h4" 
            size="md" 
            mb={"15px"} 
            fontWeight={"500"}
            _hover={{
              textDecoration: "underline"
            }}
          >
            <Link to={CTA}>{title}</Link>
          </Heading>
          <Text>
            {description}
          </Text>
        </Stack>
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
    </Card>
  )
}

export default LatestArticleCard;
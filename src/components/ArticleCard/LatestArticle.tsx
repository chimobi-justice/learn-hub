import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Image,
  Stack,
  Box
} from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'
import { stripTags } from '@helpers/stripTags';
import truncate from '@helpers/truncate';

interface IProps {
  articleImage: string;
  date: string;
  title: string;
  description: string;
  CTA: string;
  CTAText: string;
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
    <Card maxW={"md"} height="100%" display="flex" flexDirection="column" justifyContent="space-between">
      <CardBody>
        <Box>
          <Image
            src={articleImage}
            alt={title}
            borderRadius='lg'
            width={"100%"}
            height={"200px"}
            objectFit={"cover"}
          />
        </Box>
        <Stack mt='6' spacing={2}>
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

          <Text
            fontSize={"14px"}
            lineHeight={"1.7em"}
            color={"#0009"}
            dangerouslySetInnerHTML={stripTags(truncate(description, 250))}
          />
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
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardBody, Stack, StackDivider, Text } from '@chakra-ui/react'

import truncate from '@helpers/truncate'
import LoadButton from '@pages/Search/components/loadButton'

interface SearchArticlesProps {
  articles: any;
  hasMore: boolean;
  fetchNext: () => void;
  isFetching: boolean;
}

const SearchArticles: FunctionComponent<SearchArticlesProps> = ({ 
  articles,
  hasMore,
  fetchNext,
  isFetching

}) => {
  return (
    <Box mt={5}>
      {articles?.length > 0 && (
        <>
          <Text fontWeight="bold" mb={2}>Articles</Text>

          <Box border={"1px solid #f1f1f1"} borderRadius={"9px"} my={"10px"} bg={"gray.50"}>
            <Card>
              <CardBody p={"0px"}>
                <Stack divider={<StackDivider />} spacing='4'>
                  {articles?.map((article: any, index: number) => (
                    <Text
                      key={index}
                      fontSize={"14px"}
                      p={"15px"}
                      cursor={"pointer"}
                      _hover={{
                        bg: "#f1f1f1"
                      }}
                    >
                      <Link to={article?.url} style={{ display: "block" }}>
                        {truncate(article?.title, 200)}

                      </Link>
                    </Text>
                  ))}
                </Stack>

                {hasMore && (
                  <LoadButton
                    isFetching={isFetching}
                    hasMore={hasMore}
                    fetchNext={fetchNext}
                  />
                )}
              </CardBody>
            </Card>
          </Box>
        </>
      )}
    </Box>
  )
}

export default SearchArticles;

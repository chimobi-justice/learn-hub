import { ChangeEvent, FunctionComponent, useEffect, useState } from 'react'
import { Box, Container, Image, Input, InputGroup, InputLeftElement, Spinner, Text } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { useDebounce } from 'use-debounce'
import { Helmet } from 'react-helmet-async'

import { useGetSearch } from '@hooks/search/useGetSearch'
import SearchUsers from '@pages/Search/users'
import SearchArticles from '@pages/Search/articles'
import SearchThreads from '@pages/Search/threads'
import SearchImg from '@assets/images/searching.png'
import { colors } from '../../colors'

const Search: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchArr, setSearchArr] = useState<any>({ users: [], articles: [], threads: [] });
  const [value] = useDebounce(searchQuery, 1000);

  const {
    data: usersData,
    fetchNextPage: fetchNextUsers,
    hasNextPage: hasMoreUsers,
    isFetchingNextPage: isFetchingNextUsers,
    isLoading: isLoadingUser,
  } = useGetSearch(value, 'users');

  const {
    data: articlesData,
    fetchNextPage: fetchNextArticles,
    hasNextPage: hasMoreArticles,
    isFetchingNextPage: isFetchingNextArticles,
    isLoading: isLoadingArticles,
  } = useGetSearch(value, 'articles');

  const {
    data: threadsData,
    fetchNextPage: fetchNextThreads,
    hasNextPage: hasMoreThreads,
    isFetchingNextPage: isFetchingNextThreads,
    isLoading: isLoadingThreads,
  } = useGetSearch(value, 'threads');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value?.toLocaleLowerCase();
    setSearchQuery(value);
    if (value?.length === 0) {
      // Clear the search results if input is cleared
      setSearchArr({ users: [], articles: [], threads: [] });
    }
  }

  useEffect(() => {
    // Only update searchArr when there is a valid search term
    if (value.length > 0) {
      setSearchArr({
        users: usersData?.flatMap((page) => page?.data?.users?.data) || [],
        articles: articlesData?.flatMap((page) => page?.data?.articles?.data) || [],
        threads: threadsData?.flatMap((page) => page?.data?.threads?.data) || [],
      });
    } else {
      // Clear the search results when the search term is empty
      setSearchArr({ users: [], articles: [], threads: [] });
    }
  }, [usersData, articlesData, threadsData, value]);

  return (
    <>
      <Helmet>
        <title>Search | learn-hub</title>
      </Helmet>

      <Box as={"section"} py={"25px"}>
        <Container maxW={"container.xl"}>
          <InputGroup size={"lg"}>
            <InputLeftElement pointerEvents='none'>
              <FiSearch />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search for articles, threads and users..."
              value={searchQuery}
              onChange={handleInputChange}
            />
          </InputGroup>

          <Box mt={"10px"}>
            {searchQuery?.length === 0 ? (
              // Show "Waiting for search" when input is empty
              <Box
                mt="20px"
                textAlign="center"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height="100%"
                py="20px"
              >
                <Text pb={"10px"}>Waiting for search.</Text>
                <Image
                  src={SearchImg}
                  width={"200px"}
                  height={"200px"}
                  bg={"#fafafa"}
                />
              </Box>
            ) : (
              // Show loading spinner or search results
              <>
                {(isLoadingUser || isLoadingArticles || isLoadingThreads) ? (
                  <Box
                    textAlign={"center"}
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    height={"300px"}
                  >
                    <Spinner size={"xl"} thickness='4px' color={colors.primary} />
                  </Box>
                ) : (
                  // Show "Nothing found" when no results are found
                  searchQuery?.length > 0 &&
                  searchArr?.users?.length === 0 &&
                  searchArr?.articles?.length === 0 &&
                  searchArr?.threads?.length === 0 && (
                    <Box
                      mt="20px"
                      textAlign="center"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      height="100%"
                      py="20px">
                      <Text pb={"10px"}>Nothing found with that search.</Text>

                      <Image
                        src={SearchImg}
                        width={"200px"}
                        height={"200px"}
                        bg={"#fafafa"}
                      />
                    </Box>
                  )
                )}
              </>
            )}

            <SearchUsers
              users={searchArr?.users}
              hasMore={hasMoreUsers}
              isFetching={isFetchingNextUsers}
              fetchNext={fetchNextUsers}
            />

            <SearchArticles
              articles={searchArr?.articles}
              hasMore={hasMoreArticles}
              isFetching={isFetchingNextArticles}
              fetchNext={fetchNextArticles}
            />

            <SearchThreads
              threads={searchArr?.threads}
              hasMore={hasMoreThreads}
              isFetching={isFetchingNextThreads}
              fetchNext={fetchNextThreads}
            />
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Search;
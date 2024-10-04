import { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { FaChevronDown } from 'react-icons/fa6'

import Button from '@components/Button'
import { SearchLoadButtonProps } from 'src/types'

const LoadButton: FunctionComponent<SearchLoadButtonProps> = ({
  hasMore,
  fetchNext,
  isFetching
}) => {
  return (
    <Box textAlign="center" my={2}>
      <Button
        variant={"outline"}
        size={{ base: "md", lg: "md" }}
        type="submit"
        fontWeight={"semibold"}
        rounded="sm"
        rightIcon={<FaChevronDown />}
        onClick={() => fetchNext()} isDisabled={!hasMore || isFetching}>
        {isFetching ? 'Loading...' : 'Show More'}
      </Button>
    </Box>
  )
}

export default LoadButton;
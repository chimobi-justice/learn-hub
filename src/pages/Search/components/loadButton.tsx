import { Box } from "@chakra-ui/react";
import Button from "@components/Button";
import { FunctionComponent } from "react";
import { FaChevronDown } from "react-icons/fa6";

interface LoadButtonProps {
  hasMore: boolean;
  fetchNext: () => void;
  isFetching: boolean;
}

const LoadButton: FunctionComponent<LoadButtonProps> = ({
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
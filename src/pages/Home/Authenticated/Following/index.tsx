import { FunctionComponent } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import { Button } from '@components/index'

interface FollowingProps {
  setTabIndex: (index: number) => void;
}

const Following: FunctionComponent<FollowingProps> = ({ setTabIndex }) => {
  return (
    <Box textAlign="center" mt="20px">
      <Heading as="h5" size="sm" fontWeight={"semibold"}>Stories from the authors you follow will appear here.</Heading>

      <Box mt={"25px"}>
        <Button
          size="sm"
          rounded="lg"
          type="button"
          variant="solid"
          onClick={() => setTabIndex(0)}
        >
          Browse recommended stories
        </Button>
      </Box>
    </Box>
  )
}

export default Following;
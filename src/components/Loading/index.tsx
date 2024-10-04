import { FunctionComponent } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

import { colors } from '../../colors'

const Loading: FunctionComponent = () => {
  return (
    <Box 
      textAlign={"center"} 
      height={"100vh"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner 
        size={"xl"}
        thickness='4px'  
        color={colors.primary}
      />
    </Box>
  )
}

export default Loading;
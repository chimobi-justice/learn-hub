import { FunctionComponent } from 'react'
import { Stack, Skeleton as ChakraSkeleton } from '@chakra-ui/react'

const Skeleton: FunctionComponent = () => {
  return (
    <Stack width={"90%"} margin={"1.5rem auto"} gap={3}>
      <ChakraSkeleton height='150px' />
      <ChakraSkeleton height='150px' />
      <ChakraSkeleton height='150px' />
    </Stack>
  )
}

export default Skeleton;
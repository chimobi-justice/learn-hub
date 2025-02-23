import { FunctionComponent } from 'react'
import { Stack, Skeleton as ChakraSkeleton } from '@chakra-ui/react'

interface SkeletonProps {
  count: number;
}

const Skeleton: FunctionComponent<SkeletonProps> = ({ count }) => {
  const skeletons = Array.from({ length: count }, (_, index: number) => (
     <ChakraSkeleton key={index} height='150px' />
  ))

  return (
    <Stack width={"90%"} margin={"1.5rem auto"} gap={3}>
      {skeletons}
    </Stack>
  )
}

export default Skeleton;
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Popover as ChakraPopover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text
} from '@chakra-ui/react'

import { colors } from '../../colors'

interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popover: FunctionComponent<PopoverProps> = ({ isOpen, onClose }) => {
  return (
    <ChakraPopover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      placement='right'
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Text as={"span"}></Text>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader fontWeight='semibold'>Sign in to participate</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          Sign in to participate to keep the conversation going! <Text as={"span"} color={colors.primary} ml={"2px"}><Link to="/auth/login">Sign in here</Link></Text>
        </PopoverBody>
      </PopoverContent>
    </ChakraPopover>
  )
}

export default Popover;
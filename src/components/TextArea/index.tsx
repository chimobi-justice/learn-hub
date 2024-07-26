import { FunctionComponent } from 'react'
import { Textarea as ChakraInput } from '@chakra-ui/react'

import { colors } from '../../colors'

interface IProps {
  value?: string;
  name: string;
  width?: string;
  placeholder: string;
  onBlur?: () => void;
  onChange?: () => void;
}

const TextArea: FunctionComponent<IProps> = ({
  value,
  name,
  width,
  placeholder

}) => {
  return (
    <ChakraInput 
      bg={"#F7F7F7"}
      value={value}
      name={name}
      width={width || "100%"}
      fontSize={"14px"}
      size={"lg"}
      focusBorderColor={colors.primary}
      borderRadius={"12px"}
      placeholder={placeholder}
      _placeholder={{
        color: "#0009",
        fontSize: "14px",
        fontWeight: 400,
      }}

    />
  )
}

export default TextArea;
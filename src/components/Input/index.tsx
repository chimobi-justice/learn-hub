import { ChangeEvent, FocusEvent, FunctionComponent } from 'react'
import { Input as ChakraInput } from '@chakra-ui/react'

import { colors } from '../../colors'

interface IProps {
  type: string;
  value?: string;
  name: string;
  width?: string;
  placeholder: string;
  disabled?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FunctionComponent<IProps> = ({
  type,
  value,
  name,
  width,
  placeholder,
  disabled,
  onBlur,
  onChange

}) => {
  return (
    <ChakraInput 
      bg={"#F7F7F7"}
      type={type || "text"}
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
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
    />
  )
}

export default Input;
import { ChangeEvent, FocusEvent, FunctionComponent, useState } from 'react'
import { Input as ChakraInput, Icon, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa'

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
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <InputGroup size='md' alignItems={"center"}>
      <ChakraInput
        bg={"#F7F7F7"}
        type={type === "password" && showPassword ? "text" : type}
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
      {type === "password" && (
        <InputRightElement>
          <Icon
            onClick={handleShowPassword}
            as={showPassword ? FaRegEye : FaRegEyeSlash }
            cursor={"pointer"}
          />
        </InputRightElement>
      )}
    </InputGroup>
  )
}

export default Input;
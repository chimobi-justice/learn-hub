import { FunctionComponent, ReactElement, ReactNode } from 'react'
import { ButtonProps, Button as ChakraButton } from '@chakra-ui/react'

const borderRadiusMap = {
  lg: '15px',
  md: '10px',
  sm: '5px',
}

type ButtonRoundedRadius = keyof typeof borderRadiusMap;

type SizeType = 'sm' | 'md' | 'lg' | { base: string, sm?: string, md?: string, lg?: string };

type WidthSize = string | { base: string, sm?: string, md?: string, lg?: string };

interface IProps extends Pick<ButtonProps, 'fontSize' | 'fontWeight'> {
  isloading?: boolean;
  isDisable?: boolean;
  loadingText?: string;
  size: SizeType;
  width?: WidthSize;
  variant: "outline" | "solid" | "danger";
  type: "button" | "submit";
  rounded: ButtonRoundedRadius;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  children: ReactNode;
  onClick?: () => void;
}

const Button: FunctionComponent<IProps> = ({
  isloading,
  isDisable,
  loadingText,
  size,
  width,
  variant = "solid",
  type,
  rounded = "sm",
  leftIcon,
  rightIcon,
  onClick,
  children,
  ...rest
}) => {
  const borderRadius = borderRadiusMap[rounded];
  
  return (
    <ChakraButton
      isLoading={isloading}
      isDisabled={isDisable}
      loadingText={loadingText}
      size={size}
      width={width}
      variant={variant}
      type={type}
      borderRadius={borderRadius}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
}

export default Button;
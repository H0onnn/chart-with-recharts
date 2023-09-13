import styled from 'styled-components';
import { colors } from '../../constants/colors';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'textOnly';
  size?: 'small' | 'medium' | 'large';
  isFullWidth?: boolean;
  disabled?: boolean;
}

interface VariantStyle {
  border: string;
  backgroundColor: string;
  color: string;
  hover?: {
    backgroundColor: string;
    border?: string;
    color?: string;
  };
}

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  isFullWidth,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;

const TYPE_VARIANTS: Record<string, VariantStyle> = {
  primary: {
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primary,
    color: colors.white,
    hover: {
      backgroundColor: colors.secondary,
      border: `1px solid ${colors.secondary}`,
    },
  },
  secondary: {
    border: `1px solid ${colors.primary}`,
    backgroundColor: 'transparent',
    color: colors.primary,
    hover: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
  },
  textOnly: {
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    color: colors.primary,
  },
};

const TYPE_SIZES = {
  small: {
    fontSize: '13px',
    padding: '3px 9px',
    fontWeight: '500',
  },
  medium: {
    fontSize: '16px',
    padding: '8px 16px',
    fontWeight: '600',
  },
  large: {
    fontSize: '20px',
    padding: '10px 20px',
    fontWeight: '700',
  },
};

const StyledButton = styled.button<ButtonProps>`
  font-family: inherit;
  outline: none;
  line-height: 24px;
  border-radius: 10px;
  transition: all 0.4s ease;
  width: ${props => (props.isFullWidth ? '100%' : 'auto')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  filter: ${props => (props.disabled ? 'opacity(0.5)' : 'none')};
  
  border: ${props => TYPE_VARIANTS[props.variant!].border};
  background-color: ${props => TYPE_VARIANTS[props.variant!].backgroundColor};
  color: ${props => TYPE_VARIANTS[props.variant!].color};
  font-size: ${props => TYPE_SIZES[props.size!].fontSize};
  padding: ${props => TYPE_SIZES[props.size!].padding};
  font-weight: ${props => TYPE_SIZES[props.size!].fontWeight};

  &:hover {
  background-color: ${props =>
    !props.disabled &&
    (TYPE_VARIANTS[props.variant!].hover?.backgroundColor ||
      TYPE_VARIANTS[props.variant!].backgroundColor)};
  border: ${props =>
    !props.disabled &&
    (TYPE_VARIANTS[props.variant!].hover?.border || TYPE_VARIANTS[props.variant!].border)};
  color: ${props =>
    TYPE_VARIANTS[props.variant!].hover?.color || TYPE_VARIANTS[props.variant!].color};
}

  }
`;

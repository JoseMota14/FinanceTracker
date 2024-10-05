import * as React from "react";
import { buttonSizeStyles, buttonVariantStyles, StyledButton } from "./styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariantStyles;
  size?: keyof typeof buttonSizeStyles;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "default", size = "default", asChild = false, ...props },
    ref
  ) => {
    return <StyledButton variant={variant} size={size} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button };

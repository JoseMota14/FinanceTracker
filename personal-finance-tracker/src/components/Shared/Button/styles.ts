import styled, { css } from "styled-components";

// Button styles using styled-components
export const baseButtonStyles = css`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s;
  outline: none;
  &:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

// Variants for Button
export const buttonVariantStyles = {
  default: css`
    border: 1px solid var(--button-border);
    color: var(--background-color-fade);
  `,
  outline: css`
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      background-color: ${({ theme }) => theme.colors.foreground};
    }
  `,
  ghost: css`
    border: 1px solid ${({ theme }) => theme.colors.border};
    background-color: transparent;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      background-color: ${({ theme }) => theme.colors.foreground};
    }
  `,
  link: css`
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.text};
    &:hover {
      background-color: ${({ theme }) => theme.colors.foreground};
    }
  `,
};

// Sizes for Button
export const buttonSizeStyles = {
  default: css`
    height: 2.5rem;
    padding: 0 1rem;
  `,
  sm: css`
    height: 2.25rem;
    padding: 0 0.75rem;
    border-radius: 0.375rem;
  `,
  lg: css`
    height: 2.75rem;
    padding: 0 2rem;
    border-radius: 0.375rem;
  `,
  icon: css`
    height: 2.5rem;
    width: 2.5rem;
  `,
};

// Styled button using styled-components with variants
export const StyledButton = styled.button<{
  variant: keyof typeof buttonVariantStyles;
  size: keyof typeof buttonSizeStyles;
}>`
  ${baseButtonStyles}
  ${({ variant }) => buttonVariantStyles[variant]}
  ${({ size }) => buttonSizeStyles[size]}
`;

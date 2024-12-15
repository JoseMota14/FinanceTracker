import styled, { css } from "styled-components";

// Base card styles as a css block to use across styled components
export const baseCard = css`
  padding: 20px;
  border-radius: 15px;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
  }
`;

// Title with dynamic color based on "type" prop
export const Title = styled.h3<{ type?: string }>`
  color: ${({ type }) => (type === "income" ? "#38a169" : "#e53e3e")};
  font-size: 18px;
  font-weight: 500;
`;

export const cardStyles = {
  grey: css`
    background-color: grey;
    color: blue;
  `,
};

// Card size variants
export const cardSizeStyles = {
  sm: css`
    width: 100px;
  `,
  lg: css`
    width: 400px;
  `,
};

// Main card component with size prop to apply appropriate styling
export const StyledCard = styled.div<{
  size: keyof typeof cardSizeStyles;
  variant: keyof typeof cardStyles;
}>`
  ${baseCard}
  ${({ variant }) => cardStyles[variant]}
  ${({ size }) => cardSizeStyles[size]}
`;

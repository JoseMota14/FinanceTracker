import styled, { keyframes } from "styled-components";

export const rotateCube = keyframes`
0% {
  transform: rotateX(0) rotateY(0) rotateZ(0);
}
25% {
  transform: rotateX(90deg) rotateY(0) rotateZ(0);
}
50% {
  transform: rotateX(90deg) rotateY(90deg) rotateZ(0);
}
75% {
  transform: rotateX(90deg) rotateY(90deg) rotateZ(90deg);
}
100% {
  transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
}
`;

export const CubeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Cube = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #00f5d4, #00c6ff);
  animation: ${rotateCube} 2.5s infinite ease-in-out;
  transform-style: preserve-3d;
  transform-origin: center;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
  }

  &:before {
    transform: rotateY(90deg);
  }

  &:after {
    transform: rotateX(90deg);
  }
`;

export const LoadingText = styled.p`
  padding-left: 1rem;
  color: #00f5d4;
  font-size: 1.3rem;
  letter-spacing: 0.5rem;
`;

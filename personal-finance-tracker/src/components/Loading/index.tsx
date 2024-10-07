import { Cube, CubeWrapper, LoadingText } from "./styles";

const Loading = () => {
  return (
    <CubeWrapper>
      <Cube />
      <LoadingText>Loading...</LoadingText>
    </CubeWrapper>
  );
};

export default Loading;

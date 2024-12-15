import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { notifyError, notifySuccess } from "../utils/Notify";

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 1rem;
`;

const AuthContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 600px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    height: auto;
    min-height: 500px;
    max-width: 400px;
  }
`;

const FormsContainer = styled.div<{ $isSignUp: boolean; $isMobile: boolean }>`
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  transition: transform 0.6s ease-in-out;
  transform: ${({ $isSignUp, $isMobile }) =>
    $isMobile
      ? $isSignUp
        ? "translateX(0)"
        : "translateX(0)"
      : $isSignUp
      ? "translateX(100%)"
      : "translateX(0)"};

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: auto;
    transform: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background: white;
  height: 100%;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3f5efb;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4646;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const OverlayContainer = styled.div<{ $isSignUp: boolean; $isMobile: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  transform: ${({ $isSignUp, $isMobile }) =>
    $isMobile ? "none" : $isSignUp ? "translateX(-100%)" : "translateX(0)"};

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    left: 0;
    height: 200px;
    margin-top: -1px;
  }
`;

const Overlay = styled.div`
  background: linear-gradient(
    45deg,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
`;

const OverlayTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
  }
`;

const OverlayText = styled.p`
  margin-bottom: 2rem;
  font-size: 1rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }
`;

const Button = styled.button<{ $isOverlay?: boolean }>`
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border: ${(props) =>
    props.$isOverlay ? "2px solid white" : "2px solid #3f5efb"};
  border-radius: 10px;
  cursor: pointer;
  background: ${(props) =>
    props.$isOverlay
      ? "transparent"
      : "linear-gradient(45deg, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%)"};
  color: white;
  transition: all 0.3s;
  width: 100%;
  max-width: ${(props) => (props.$isOverlay ? "200px" : "100%")};

  &:hover {
    background: ${(props) => (props.$isOverlay ? "white" : "white")};
    color: ${(props) => (props.$isOverlay ? "#3f5efb" : "#3f5efb")};
    opacity: ${(props) => (props.$isOverlay ? "1" : "0.9")};
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const OverlayContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;
`;

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { successLogin } = useAuth();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormData>();

  const onSubmit = async (data: AuthFormData) => {
    try {
      const endpoint = isSignUp
        ? "https://localhost:7085/api/Auth/register"
        : "https://localhost:7085/api/Auth/login";

      const response = await axios.post(endpoint, data);

      if (response.status === 200) {
        if (!isSignUp) {
          console.log(response);
          successLogin(
            data.email,
            response.data.refreshToken,
            response.data.token
          );
        }
        notifySuccess(isSignUp ? "Sign up successful" : "Login successful");
      }
    } catch (error) {
      notifyError(isSignUp ? "Sign up failed" : "Login failed");
      console.error(error);
    }
  };

  return (
    <Container>
      <AuthContainer>
        {isMobile && !isSignUp && (
          <OverlayContainer $isSignUp={isSignUp} $isMobile={isMobile}>
            <Overlay>
              <OverlayContent>
                <OverlayTitle>Hello, Friend!</OverlayTitle>
                <OverlayText>
                  Register now and start your journey with us!
                </OverlayText>
                <Button $isOverlay onClick={() => setIsSignUp(true)}>
                  Sign Up
                </Button>
              </OverlayContent>
            </Overlay>
          </OverlayContainer>
        )}

        <FormsContainer $isSignUp={isSignUp} $isMobile={isMobile}>
          {!isSignUp ? (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Title>Login</Title>
              <InputGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </InputGroup>

              <Button type="submit">Login</Button>
            </Form>
          ) : (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Title>Sign Up</Title>
              <InputGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label>Password</Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <ErrorMessage>{errors.password.message}</ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords don't match",
                  })}
                />
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                )}
              </InputGroup>

              <Button type="submit">Sign Up</Button>
            </Form>
          )}
        </FormsContainer>

        {!isMobile ? (
          <OverlayContainer $isSignUp={isSignUp} $isMobile={isMobile}>
            <Overlay>
              <OverlayContent>
                <OverlayTitle>
                  {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
                </OverlayTitle>
                <OverlayText>
                  {isSignUp
                    ? "Already have an account? Sign in to continue your journey."
                    : "Register now and start your journey with us!"}
                </OverlayText>
                <Button $isOverlay onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp ? "Sign In" : "Sign Up"}
                </Button>
              </OverlayContent>
            </Overlay>
          </OverlayContainer>
        ) : (
          isSignUp && (
            <OverlayContainer $isSignUp={isSignUp} $isMobile={isMobile}>
              <Overlay>
                <OverlayContent>
                  <OverlayTitle>Welcome Back!</OverlayTitle>
                  <OverlayText>
                    Already have an account? Sign in to continue your journey.
                  </OverlayText>
                  <Button $isOverlay onClick={() => setIsSignUp(false)}>
                    Sign In
                  </Button>
                </OverlayContent>
              </Overlay>
            </OverlayContainer>
          )
        )}
      </AuthContainer>
    </Container>
  );
}

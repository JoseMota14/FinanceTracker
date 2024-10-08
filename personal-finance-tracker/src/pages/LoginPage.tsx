import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "../components/Shared/Button";
import useAuth from "../hooks/useAuth";
import { notifyError, notifySuccess } from "../utils/Notify";

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormData>();

  const { email, changeEmail, successLogin } = useAuth();

  const onSubmit = async (data: AuthFormData) => {
    try {
      const endpoint = isLogin
        ? "https://localhost:7085/api/Auth/login"
        : "https://localhost:7085/api/Auth/register";
      const response = await axios.post(endpoint, data);
      console.log(response.status);
      if (response.status === 200) {
        if (isLogin) {
          successLogin(
            data.email,
            response.data.refreshToken,
            response.data.token
          );
        }
      }
      if (response.data.token) {
      }

      notifySuccess(isLogin ? "Login succeed" : "Sign up succeed");
    } catch (error) {
      notifyError(isLogin ? "Login failed" : "Sign up failed");
      console.error(isLogin ? "Login failed:" : "Sign up failed:", error);
    }
  };

  const buttonStyle = {
    background:
      "radial-gradient(circle, rgba(63, 94, 251, 1) 0%, rgba(252, 70, 107, 1) 100%)",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "10px",
    marginBottom: "10px",
    marginTop: "10px",
    width: "100%",
  };

  return (
    <Container>
      <Modal>
        <Top>{isLogin ? "Login" : "Sign Up"}</Top>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Inputs>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              aria-label="Email input"
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
          </Inputs>
          <Inputs>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              aria-label="Password input"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {isLogin && <ForgotPassword>Forgot password?</ForgotPassword>}

            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </Inputs>
          {!isLogin && (
            <Inputs>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                aria-label="Confirm password input"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watch("password") || "The passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
              )}
            </Inputs>
          )}
          <Button type="submit" style={buttonStyle}>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <ToggleButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Login"}
        </ToggleButton>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  background: rgb(63, 94, 251);
  background: radial-gradient(
    circle,
    rgba(63, 94, 251, 1) 0%,
    rgba(252, 70, 107, 1) 100%
  );
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const Top = styled.h2`
  text-align: center;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  label {
    margin-bottom: 5px;
  }
  input {
    padding: 10px;
    border: none;
    border-radius: 5px;
    border-bottom: 1px solid #ccc;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
`;

const ForgotPassword = styled.a`
  font-size: x-small;
  cursor: pointer;
  margin-bottom: 10px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
`;

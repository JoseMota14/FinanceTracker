import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Select = styled.select`
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

export const Button = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;

export const Error = styled.span`
  color: red;
  font-size: 0.875rem;
`;

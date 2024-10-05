import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 15px;
    box-shadow: none; // Removing shadow for a simpler mobile look
    max-width: 100%;
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;

  @media (max-width: 600px) {
    font-size: 13px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

  @media (max-width: 600px) {
    padding: 8px;
    font-size: 13px;
  }
`;

export const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

  @media (max-width: 600px) {
    padding: 8px;
    font-size: 13px;
  }
`;

export const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }

  @media (max-width: 600px) {
    padding: 10px;
    font-size: 14px;
  }
`;

export const Error = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

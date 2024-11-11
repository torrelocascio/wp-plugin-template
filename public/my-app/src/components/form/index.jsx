import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

// Styled components for styling the form
const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${(props) => (props.success ? "green" : "red")};
`;

// Spinner animation and styling
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${rotate} 1s linear infinite;
  margin-left: 8px;
`;

function UpdateForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner
    try {
      const response = await fetchWP(ajax_url, formData);
      if (response.result !== "success") {
        throw new Error(response.message);
      }
      setMessage("Form submitted successfully!");
      setIsSuccess(true);
    } catch (error) {
      setMessage("There was an error submitting the form.");
      setIsSuccess(false);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <FormContainer>
      <Title>Contact Us</Title>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Button type="submit">
          Submit
          {loading && <Spinner />} {/* Show spinner when loading */}
        </Button>
      </form>
      {message && <Message success={isSuccess}>{message}</Message>}
    </FormContainer>
  );
}

export default UpdateForm;

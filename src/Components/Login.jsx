import React, { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useStateValue } from '../StateProvider';


function Login(){

  const navigate = useNavigate();
  const [{},dispatch] = useStateValue();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/user/login', { email, password });
      if (response.status === 200){
        console.log(response)
      };
      localStorage.setItem('token', response.data.token);
      dispatch({ type: 'Set_User', user: response.data.user });
      navigate('/');
    }catch(err){
      setError("Invalid Credentials");
    }
  };


  return (
    <Container>
        <Logo>
          <img src="/amazon_logo.png" alt="amazon_logo" />
        </Logo>

        <FormContainer onSubmit={handleLogin}>
          <h3>Log In</h3>

          <InputContainer>
            <label htmlFor="email">Email</label>
            <input 
              id='email' 
              type="email" 
              placeholder="Example@gmail.com" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required/>
          </InputContainer>

          <InputContainer>
            <label htmlFor="password">Password</label>
            <input 
              id='password' 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required/>
          </InputContainer>

          {/* Display error message */}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginButton type='submit'>Login</LoginButton>

          <InfoText>
            By continuing, you agree to Amazon's <span>Conditions of Use</span> and <span> Privacy Notice</span>  
          </InfoText>

        </FormContainer>

        <SignUpButton onClick={() => navigate("../signup")}>  Create Amazon Account  </SignUpButton>

    </Container>
  )
}


const Container = styled.div`
  width: 100%;
  height: fit-content;
  background-color: #fff;

  margin: auto;
  display: flex;
  align-items:center;
  flex-direction:column;
  padding:0;
  margin: auto;
`;

const Logo = styled.div`
  width: 120px;
  margin-bottom: 20px;
  margin-top: 20px;
  img{
    width: 100%;
  }
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  min-width:328px;
  max-width:545px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;

  h3{
    font-size: 28px;
    font-weight: 400;
    line-height: 38px;
    align-self: flex-start;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;
  
  label{
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    
  }
  
  input {
    width: 100%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;

    &:hover {
      border: 1px solid orange;
    }
  }
`;

const LoginButton = styled.button`
  width: 70%;
  height: 37px;
  background-color: #f3b414;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 30px;

  &:hover{
    cursor: pointer;
    background-color: #edad0c;
  }
`;

const InfoText = styled.p`
  font-size: 15px;
  width: 100%;
  word-wrap: normal;
  word-break: normal;
  margin-top: 50px;
  padding:1px;

  span{
    color: #426bc0;
    cursor: pointer;
    border-bottom: 1px solid #426bc0;

    &:hover{
      color: #608be2; 
      border-bottom: 1px solid #608be2;
    }
  }
`;

const SignUpButton = styled.button`
  width: 55%;
  height: 37px;
  font-size: 12px;
  margin-top: 20px;
  max-width:525px;
  min-width:225px;

  &:hover {
    background-color: #dfdfdf;
    border: 1px solid gray;
    cursor: pointer;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 5px 0;
`;

export default Login
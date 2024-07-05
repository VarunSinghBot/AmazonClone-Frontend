import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

function AddProduct() {

  const [title,setTitle] = useState("")
  const [url,setUrl] = useState("")
  const [price,setPrice] = useState(0)
  const [rate,setRate] = useState(0)

  const navigate = useNavigate();

  const addProduct = (e) => {
    e.preventDefault();

    axios.post('/product/add', {title, url, price, rate}).then(() => {
      setTitle("")
      setUrl("")
      setPrice(0)
      setRate(0)
    }).catch((error) => {
      alert(error.message)
    });
  }

  return (
    <Container>
        <Logo>
          <img src="/amazon_logo.png" alt="amazon_logo" />
        </Logo>

        <FormContainer action="">
          <h3>Add Product</h3>

          <InputContainer>
            <label htmlFor="title">Title</label>
            <input 
              id='title' 
              type="text" 
              placeholder="Enter product Title" 
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              required/>
          </InputContainer>

          <InputContainer>
            <label htmlFor="url">Image URL</label>
            <input 
              id='url' 
              type="text" 
              placeholder="Enter image URL" 
              value={url}
              onChange={(e)=>setUrl(e.target.value)}
              required/>
          </InputContainer>

          <InputContainer>
            <label htmlFor="prize">Prize</label>
            <input 
              id='prize' 
              type="number" 
              placeholder="Enter product prize" 
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              required/>
          </InputContainer>

          <InputContainer>
            <label htmlFor="rate">Rating</label>
            <input 
              id='rate' 
              type="number" 
              min="0" 
              max="5" 
              placeholder="Enter product Rating (0.0 - 5.0 {0.5})" 
              value={rate}
              onChange={(e)=>setRate(e.target.value)}
              required/>
          </InputContainer>

          <LoginButton onClick={addProduct}>Add Product  </LoginButton>

        </FormContainer>

    </Container>
  )
}


const Container = styled.div`
  width: 100%;
  height: fit-content;
  background-color: #fff;
  display: flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
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
  width: 35%;
  height: 460px;
  min-width:328px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;

  h3{
    font-size: 28px;
    font-weight: 400;
    line-height: 38px;
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
  height: 35px;
  background-color: #f3b414;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-top: 20px;

  &:hover{
    cursor: pointer;
    background-color: #edad0c;
  }
`;

export default AddProduct

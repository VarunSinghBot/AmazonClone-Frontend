import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';
import PaymentOption from './PaymentOption';

function Address(){
    const navigate = useNavigate()
    const [{}, dispatch] = useStateValue();

    const [fullName, setFullName] = useState("");
    const [contact, setContact] = useState("");
    const [flat, setFlat] = useState("");
    const [area, setArea] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const deliver = e => {
        e.preventDefault()
        dispatch({
            type: 'Set_Address',
            item:{
                fullName,
                contact,
                flat,
                area,
                landmark,
                city,
                state,
            }
        })
        navigate('../paymentoption');
    };

    return (
        <Container>
        <Navbar/>
            <Main>
            <FormContainer onSubmit={deliver}>
                <legend>Shipping Info</legend>
                <InputContainer>
                <label htmlFor="name">Enter Name:</label>
                <input 
                    id='name' 
                    type="text" 
                    placeholder="Enter your full name" 
                    value={fullName}
                    onChange={ e => setFullName(e.target.value)} 
                    required
                />
                </InputContainer>

                <InputContainer>
                <label htmlFor="contact">Contact Info (Phone or Mobile Number):</label>
                <input 
                    id='contact' 
                    type="text" 
                    placeholder="Enter your Phone Number" 
                    value={contact} 
                    onChange={ e => setContact(e.target.value)} 
                    required
                />
                </InputContainer>

                <InputContainer>
                <label htmlFor="flat">Flat, House no. Building, Company:</label>
                <input 
                    id="flat" 
                    type="text" 
                    placeholder="Flat, House no. Building, Company" 
                    onChange={ e => setFlat(e.target.value)} 
                    value={flat} 
                    required
                />
                </InputContainer>

                <InputContainer>
                <label htmlFor="area">Area, Colony, Street:</label>
                <input 
                    id='area' 
                    type="text" 
                    placeholder="Enter Area, Colony, Street" 
                    value={area}
                    onChange={ e => setArea(e.target.value)}
                    required
                />
                </InputContainer>

                <InputContainer>
                <label htmlFor="landmark">Landmark</label>
                <input 
                    id='landmark' 
                    type="text" 
                    placeholder="Enter nearby Landmark" 
                    onChange={ e  => setLandmark(e.target.value)} 
                    value={landmark}
                />
                </InputContainer>

                <InputContainer>
                <label htmlFor="city">Town/City:</label>
                <input 
                    id='city' 
                    type="text" 
                    placeholder="Enter your Town/City" 
                    value={city}
                    onChange={ e => setCity(e.target.value)}
                    required
                />
                </InputContainer>

                <InputContainer>
                <label htmlFor="state">State/Province:</label>
                <input 
                    id='state' 
                    type="text" 
                    placeholder="Enter your State/Province" 
                    value={state} 
                    onChange={(e) => setState(e.target.value)} 
                    required
                />
                </InputContainer>

                <button type='submit'>Deliver to this Address</button>
            </FormContainer>
        </Main>
        </Container>
    )
}

const Container = styled.div`
    height:100%;
    width:100%;
    background-color: #fcfcfc;
`;

const Main = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-top:8dvh;

    @media only screen and (max-width: 768px) {
      margin-top:16dvh;
    }
`;

const FormContainer = styled.form`
    margin:10px;
    width: 60%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);

    legend{
        font-size: 22px;
        font-weight: 400;
        line-height: 38px;
        text-align:center;
    }

    button{
        width: 60%;
        height: 35px;
        background-color: #f3b414;
        border: none;
        outline: none;
        border-radius: 10px;
        margin-top: 18px;
        
        &:hover{
            cursor: pointer;
            background-color: #edad0c;
        }
    }

    @media only screen and (max-width:1100px){
        width:70%;
    }

    @media only screen and (max-width:768px){
        width:100%;
        background-color:#fff;
        box-shadow:none;
        border-radius:0;
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
        width: 99%;
        height: 33px;
        padding-left: 5px;
        border-radius: 5px;
        border: 1px solid lightgray;
        margin-top: 5px;

        &:hover{
            border: 1px solid orange;
        }
    }
`;

export default Address
import React from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import { useStateValue } from '../StateProvider';
import { useNavigate } from 'react-router-dom';

function Cards({id, image, title, rating, price}){

    const[{user}, dispatch] = useStateValue();
    const navigate = useNavigate();

    const addToBaket = e => {
        e.preventDefault();
        
        if (user) {
            dispatch({
                type: 'Add_To_Basket',
                item: {
                    id, image, title, rating, price
                }
            });
        } else {
            // Handle user not authenticated scenario (e.g., redirect to login page)
            console.log('User not authenticated. Redirecting to login.');
            navigate('/login')
        }
        
    };


    return (
        <Container>
            <Image>
                <img src={image} alt="item1" />
            </Image>
            <Description>
                <h4>{title}</h4>

                <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly />

                <p>₹ {price}</p>

                <div>
                    <button onClick={addToBaket}> Add to Cart </button>
                </div>
            </Description>
        </Container>
    )
};

const Container = styled.div`
    height:95%;
    width:95%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    border-radius:8px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    padding:8px;
    z-index:2;
`;

const Image = styled.div`
    width: auto;
    height: auto;
    display:flex;
    align-items:center;
    justify-content:center;
    flex:.6;
    /* border:1px solid red; */
    img{
        width: 100%;
        height: 100%;
    }
`;

const Description = styled.div`
    height:fit-content;
    width:100%;
    display:flex;
    justify-content:space-evenly;
    flex-direction:column;
    flex:.7;

    h4{
        font-size:16px;
        font-weight: 600;
    }
    p{
        font-weight: 600;
    }
    div{
        height: 34px;
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;


        button{
            height: 100%;
            width:100%;
            background-color: #f3b414;
            border: none;
            outline: none;
            border-radius: 10px;
            cursor:pointer;
    
            &:hover{
                background-color: #edad0c;
            } 
        }
    }
    
    @media only screen and (max-width:768px){
        div button{width:90%;}
    }
`;


export default Cards
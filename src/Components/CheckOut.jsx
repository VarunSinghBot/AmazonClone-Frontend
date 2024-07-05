import React, {useState} from 'react'
import { useStateValue } from '../StateProvider'
import styled from 'styled-components';
import Navbar from './Navbar';
import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from "react-router-dom";

function CheckOut(){
  const [{basket},dispatch] = useStateValue();
  const navigate = useNavigate();

  const removeFromBasket = (e,id, price) => {
    e.preventDefault()

    dispatch({
      type: 'Remove_From_Basket',
      id: id
    })

    const newSubtotal = subtotal - price;
    setSubtotal(newSubtotal);
  }


  console.log('checkout >>>>>>>>',basket)

  const [subtotal, setSubtotal] = useState(getBasketTotal(basket));

  // Function to calculate the total from basket items
  function getBasketTotal(basket) {
    // Calculate the total from basket items
    return basket.reduce((total, item) => total + item.price, 0);
  }

  // Function to handle subtotal change
  function handleSubtotalChange(value) {
    setSubtotal(value);
  }


  return (
    <>
      <Container>

        <Navbar/>

        <Main>
            {basket.length === 0 ? (
              <>
                <Cart>
                  <>
                    <h2>Shopping Cart</h2>
                    <i>Your Shopping Cart is Empty</i>
                    
                  </>
                </Cart>
                <Amount>
                  <>
                    <p>
                      Subtotal ({basket.length} items) : {''}
                    </p>
                      <strong>
                        <StyledCurrencyInput
                          name="subtotal"
                          placeholder="Enter amount"
                          value={subtotal}
                          onValueChange={handleSubtotalChange}
                          decimalsLimit={2}
                          prefix="₹ "
                          intlConfig={{ locale: 'en-IN'}}
                          allowNegativeValue={false}
                          readOnly
                        />
                      </strong>
                      <CheckoutBtn onClick={() => navigate("../")}>Continue Browsing</CheckoutBtn>
                  </>
                </Amount>
              </>
              ):(
              <>
                <Cart>
                  <h2>Shopping Cart</h2>

                  {basket.map((item,index) => (
                    <Product key={`${item.id}-${index}`}>
                      <Image>
                          <img src={item.image} alt="image" />
                      </Image>
                      <Description> 
                          <h4>{item.title}</h4>
                          <p>₹ {item.price}</p>
                          <button onClick={e => removeFromBasket(e,item.id,item.price)}>Remove</button>
                      </Description>
                    </Product>
                  ))}
                </Cart>
                <Amount>
                  <>
                    <p>
                      Subtotal ({basket.length} items) :
                    </p>
                      <strong>
                        <StyledCurrencyInput
                          name="subtotal"
                          placeholder="Enter amount"
                          value={subtotal}
                          onValueChange={handleSubtotalChange}
                          decimalsLimit={2}
                          prefix="₹ "
                          intlConfig={{ locale: 'en-IN'}}
                          allowNegativeValue={false}
                          readOnly
                        />
                      </strong>

                    <small>
                      <input type="checkbox" id='checkGift'/>
                      <label htmlFor='checkGift'>This order contains a gift.</label>
                    </small>

                    <CheckoutBtn onClick={() => navigate("../address")}>Proceed to CheckOut</CheckoutBtn>
                  </>
                </Amount>
              </>
            )}
            
        </Main>
      </Container>
    </>
  )
}

const Container = styled.div`
    width: 100%;
    max-width:100dvw;
    height: fit-content;
    margin: 0;
    padding:0;
    background-color: #f1f1f1;
    position: relative;
`;


const Main = styled.div`
    display: flex;
    padding: 15px;
    margin-top:8dvh;

    @media only screen and (max-width: 1200px) {
      flex-direction: column;
    }
    @media only screen and (max-width: 768px) {
      margin-top:16dvh;
    }
`;

const Cart = styled.div`
    padding: 15px;
    background-color: #fff;
    border-radius:8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    flex: 0.7;

    @media only screen and (max-width: 1200px) {
      flex: none;
    }
    
    i{
      width:100%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:22px;
      font-weight:400;
    }

    h2 {
      font-weight: 500;
      border-bottom: 1px solid lightgray;
      padding-bottom: 15px;
      margin-bottom:20px;
    }
`;

const Image = styled.div`
    flex: 0.3;
    display:grid;
    place-items:center;
    margin-right:10px;
    padding: 8px;

    img {
      width: 100%;
      height:auto;
      max-height:280px;
      
    }
`;

const Product = styled.div`
    display: flex;
    align-items: center;
    margin-bottom:50px;
`;

const Description = styled.div`
  flex: 0.7;

  h4 {
    font-weight: 600;
    font-size: 18px;
  }

  p {
    font-weight: 600;
    margin-top: 10px;
  }

  button {
    background-color: transparent;
    color: #1384b4;
    border: none;
    outline: none;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;


const Amount = styled.div`
  flex: 0.3;
  border-radius:10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin-left: 15px;  
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 20px;
  
  @media only screen and (max-width: 1200px) {
    flex: none;
    margin-top: 20px;
    margin-left:0;
  }
  p {
    font-size: 20px;
  }

  small {
    display: flex;
    align-items: center;

    label{
      margin-left: 5px;
    }
  }
`;

const StyledCurrencyInput = styled(CurrencyInput)`
  margin:15px;
  border:none;
  outline:none;
  font-size:20px;
  font-weight: 600;
  width:fit-content;
  text-align:center;

  input{
    text-align: center;
  }
`;

const CheckoutBtn = styled.button`
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

export default CheckOut
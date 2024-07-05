import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar'
import CurrencyInput from 'react-currency-input-field'
import { useStateValue } from '../StateProvider'
import axios from 'axios'; 


function PaymentOption() {
  const [{basket, address, user},dispatch] = useStateValue();
  const navigate = useNavigate();
  const subtotal = getBasketTotal(basket);

  function getBasketTotal(basket) {
    return basket.reduce((total, item) => total + item.price, 0);
  }

  
  // For orders placed
  useEffect(() => {
    if (basket.length === 0) {
      navigate('/')
    }
  }, [basket]);

 // Example function to place an order
const placeOrder = async () => {
  const orderedItems = basket.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      imageUrl: item.image 
  }));
  console.log("orderItems >>>>>>>>>>>>",orderedItems)
  const data = {
    userId: user._id,
    address: {...address},
    contactDetails: address.contact,
    orderedItems: orderedItems,
    totalPrice: subtotal
  };
  console.log('new data>>>>>>>>>>>>', data);
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.post('http://localhost:3000/order/add', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log('Order placed successfully:', response.data);
    dispatch({ type: 'Empty_Basket' });
    navigate('/');
    alert('Order Placed');
    
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Failed to place order. Redirecting to home page');
    navigate('/');
  }
};


  return (
    <Container>
      <Navbar/>

      <Main>
        <Review>
          <h2>Review Your Order</h2>

          <AddressContainer>
            <h4>Shipping Address</h4>
            <p><span className='heading'>Ship to:</span> {address.fullName}</p>
            <dl>
              <dt className='heading'>Address:</dt>
              <dd>{address.flat}</dd>
              <dd>{address.area}</dd>
              <dd>{address.landmark}</dd>
              <dd>{address.city}, {address.state}</dd>
            </dl>
            <p><span className='heading'>Contact:</span> {address.contact}</p>
          </AddressContainer>

          <PaymentContainer>
            
            <h4>Paymnet Options</h4>
            <label htmlFor='cod'><input type="radio" name="Payment" id="cod" value="cod" defaultChecked/> Cash on Delivery</label>

            {/* For API Payment Integration */}
            {/* <label htmlFor='online'><input type="radio" name="Payment" id="online" value="NetBanking"/> Net Banking</label> */}

          </PaymentContainer>

          <OrderSummary>
            <h4>Your Order</h4>
            {basket.map((item,index) => (
              <Product key={`${item.id}-${index}`}>
                <Image>
                    <img src={item.image} alt="image" />
                </Image>
                <Description> 
                    <h4>{item.title}</h4>
                    <p>₹ {item.price}</p>
                </Description>
              </Product>
            ))}
          </OrderSummary>
        </Review>
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
          {basket.length === 0 ? (
              <>
                <CheckoutBtn onClick={() => navigate("../")}>Continue Browsing</CheckoutBtn>
              </>
            ):(
              <>
                <CheckoutBtn onClick={placeOrder}>Place Order</CheckoutBtn>
              </>
            )
          }
        </>
        </Amount>
      </Main>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  max-width:100dvw;
  height: fit-content;
  margin: 0;
  padding:0;
  background-color: #f1f1f1;
  border: 1px solid black;
  position: relative;
`;

const Main = styled.div`
  display: flex;
  padding: 15px;
  margin-top:8dvh;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Review = styled.div`
    padding: 15px;
    background-color: #fff;
    border-radius:8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    flex: 0.7;

    @media only screen and (max-width: 1200px) {
      flex: none;
    }

    h2 {
      font-weight: 500;
      border-bottom: 1px solid lightgray;
      padding-bottom: 15px;
      margin-bottom:10px;
    }
`;

const AddressContainer = styled.div`
  margin-bottom:20px;
  border-bottom:1px solid lightgrey;
  padding-bottom:20px;

  h4{
    margin-bottom:15px;
  }
  p,dl{
    margin-left: 15px;
    padding-inline:2px;
  }
  dl{
    padding-block:10px;
  }
  dd{
    margin-left: 10px;
  }
  .heading{
    font-weight: 600;
  }
`;

const PaymentContainer = styled.div`
  margin-bottom:20px;
  border-bottom:1px solid lightgrey;
  padding-bottom:20px;
  display:flex;
  flex-direction:column;
  gap:10px;

  h4{
    margin-bottom:15px;
  }

  label,input{
    cursor:pointer;
  }
`;

const OrderSummary = styled.div`
  padding-left:10px;

  h4{
    margin-bottom:30px;
  }`;

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

export default PaymentOption

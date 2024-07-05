import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';

const Order = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:3000/order/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data.orders); 
        console.log("Response >>>>>>>>", response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        navigate('/login'); 
      }
    };

    fetchOrders();
  }, [navigate]);


  console.log("Orders state updated >>>>>>>>>>>", orders);

  return (
    <Container>
      <Navbar />
      <Header>
        <h2>Your Orders</h2>
      </Header>

      <Main>
        {orders.length === 0 ? (
          <EmptyState>No orders found.</EmptyState>
        ) : (
          orders.map((order) => (
            <Review key={order._id}>
              <h2>Order Date: {new Date(order.createdAt).toLocaleDateString()}</h2>

              <AddressContainer>
                <h4>Shipping Address</h4>
                <p>
                  <span className="heading">Ship to:</span> {order.user.username}
                </p>
                <dl>
                  <dt className="heading">Address:</dt>
                  <dd>{order.address.flat}</dd>
                  <dd>{order.address.area}</dd>
                  <dd>{order.address.landmark}</dd>
                  <dd>
                    {order.address.city}, {order.address.state}
                  </dd>
                </dl>
                <p>
                  <span className="heading">Contact: </span>
                  {order.contactDetails}
                </p>
              </AddressContainer>

              <PaymentContainer>
                <h4>Payment Options</h4>
                <p>Cash on Delivery</p>
                <strong>
                  To be paid:
               
                  <StyledCurrencyInput
                    name="subtotal"
                    placeholder="Enter amount"
                    value={order.totalPrice}
                    decimalsLimit={2}
                    prefix="₹ "
                    intlConfig={{ locale: 'en-IN'}}
                    allowNegativeValue={false}
                    readOnly
                  />
          
                </strong>
              </PaymentContainer>

              <OrderSummary>
                <h4>Your Order</h4>
                {order.orderedItems.map((item, index) => (
                  <Product key={`${item._id}_${index}`}>
                    <Image>
                      <img src={item.imageUrl} alt="Product" />
                    </Image>
                    <Description>
                      <h4>{item.title}</h4>
                      <p>₹ {item.price}</p>
                    </Description>
                  </Product>
                ))}
              </OrderSummary>
            </Review>
          ))
        )}
      </Main>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  height: fit-content;
  margin: 0;
  padding: 0;
  background-color: #f1f1f1;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  padding: 15px;
  margin-top: 8vh;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Main = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: column;
  gap: 20px;
`;

const Review = styled.div`
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex: 1;

  h2 {
    font-weight: 500;
    border-bottom: 1px solid lightgray;
    padding-bottom: 15px;
    margin-bottom: 10px;
  }
`;

const AddressContainer = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 20px;

  h4 {
    margin-bottom: 15px;
  }
  p,
  dl {
    margin-left: 15px;
    padding-inline: 2px;
  }
  dl {
    padding-block: 10px;
  }
  dd {
    margin-left: 10px;
  }
  .heading {
    font-weight: 600;
  }
`;

const PaymentContainer = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  h4 {
    margin-bottom: 0px;
  }
  p {
    margin-bottom: 10px;
  }
`;

const OrderSummary = styled.div`
  padding-left:10px;

  h4{
    margin-bottom:30px;
  }
`;

const StyledCurrencyInput = styled(CurrencyInput)`
  margin-left:20px;
  border:none;
  outline:none;
  font-size:18px;
  font-weight: 600;
  width:fit-content;
  

  input{
    text-align: center;
  }
`;

const Image = styled.div`
  flex: 0.22;
  display: grid;
  place-items: center;
  margin-right: 50px;
  padding: 8px;

  img {
    width: 100%;
    height: auto;
    max-height: 280px;
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
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

const EmptyState = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 1.2rem;
`;

export default Order;

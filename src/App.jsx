import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import styled from 'styled-components';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import CheckOut from './Components/CheckOut';
import Address from './Components/Address';
import PaymentOption from './Components/PaymentOption';
import AddProduct from './Components/AddProduct'
import Order from "./Components/Order";

function App() {
  
  return (
    <Router>
        <Container>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login />}/> 
                <Route path="/signup" element={<Signup />}/>
                <Route path="/checkout" element={<CheckOut/>}/>
                <Route path="/address" element={<Address/>}/>
                <Route path="/paymentoption" element={<PaymentOption/>}/>
                <Route path="/addproduct" element={<AddProduct/>}/>
                <Route path="/orders" element={<Order/>}/>
            </Routes>
        </Container>
     </Router>
  )
}

const Container = styled.div`
  height: 100dvh;
  width: 100dvw;
`;

export default App

import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styled from 'styled-components'
import Cards from './Cards';
import axios from 'axios';


function Home(){

  const [products, setProducts] = useState([]);
  const [searchInput,setSearchInput] = useState("");
  const [searchedProducts,setSearchedProducts] = useState([]);

  // To Fetch the products
  useEffect(()=>{
    const fetchData = async() =>{
      try {
        const response = await axios.get('http://localhost:3000/product/get');
        console.log('Product >>>>>', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData()
  },[])

  // Handeling Searched data or inputs
  // ----------------------------------------------------------------------
  useEffect(()=>{
    const handleSearch = async() =>{
      if(searchInput.trim().length > 0){
        try {
          const response = await axios.get(`http://localhost:3000/product/search?search=${searchInput}`);
          setSearchedProducts(response.data);
        } catch (error) {
          console.error('Error searching data:', error);
        }
      }
      else{
        setSearchedProducts([]);
      }
    };
    handleSearch()
  },[searchInput])
  // ----------------------------------------------------------------------

  //Constins products to display
  const productsToDisplay = searchInput.trim().length > 0 ? searchedProducts : products;

  return (
    <Container>
      <Navbar searchInput={searchInput} setSearchInput={setSearchInput}/>

      <Banner>
        <img src="banner.jpg" alt="Banner"/>
        <img src="mobile_banner.jpg" alt="Banner"/>
      </Banner>

      <Main>
        
        {productsToDisplay.map((product) => (
          <Cards
            key={product._id}
            id={product._id}
            title={product.title}
            image={product.url}
            rating={product.rate}
            price={product.price}
          />
        ))}

      </Main>
    </Container>
  )
};

const Container = styled.div`
  margin:0;
  padding:0;
  width: 100%;
  max-width:100dvw;
  height:auto;
  background-color:rgba(231, 224, 224,.86);
`;



const Banner = styled.div`
  width: 100%;

  img{
    width: 100%;
    height: 100%;
    margin-top:7dvh;
    -webkit-mask-image: linear-gradient(
      to bottom,
      rgba(0,0,0,1),
      rgba(0,0,0,.95),
      rgba(0,0,0,.85),
      rgba(0,0,0,.75),
      rgba(0,0,0,.55),
      rgba(0,0,0,.45),
      rgba(0,0,0,0)
    );

    &:nth-child(2) {
      display: none;
    }

    @media only screen and (max-width: 767px) {
      margin-top:12dvh;

      &:nth-child(1) {
        display: none;
      }

      &:nth-child(2) {
        display: block;
        -webkit-mask-image: none;
      }
  }
}
`;

const Main = styled.div`
  display: grid;
  justify-content: center;
  place-items: center;
  width: 100%;

  grid-auto-rows: 440px;
  grid-template-columns: repeat(4, 300px);
  grid-gap: 20px;

  /* Mobile */
  @media only screen and (max-width:768px){
    grid-template-columns: repeat(2, 45%);
    grid-gap:15px;
    margin-top:20px;
  }

  /* Tablet */
  @media only screen and (min-width:768px) and (max-width:1200px){
    grid-template-columns: repeat(3, 28%);
    grid-auto-rows: 460px;
  }

  @media only screen and (min-width: 768px) {
    margin-top: -140px;
    padding: 10px 0px;
  }
`;


export default Home
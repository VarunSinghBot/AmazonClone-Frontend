import React from 'react'
import styled from 'styled-components'
import { useStateValue } from '../StateProvider';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar({searchInput,setSearchInput}){

  const [{basket,user}] = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current location is the home page
  const isHomePage = location.pathname === '/';

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  
  return (
    <Container>
      <Inner>
        <Logo onClick={()=> navigate('../')}>
          <img src="/amazon_logo1.png" alt="AmazonLogo" />
        </Logo>

       {/* Conditionally render search bar based on isHomePage */}
       {isHomePage && (
          <SearchBar>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search"
            />
            <SearchIcon>
              <img src="/searchIcon.png" alt="SearchIcon" />
            </SearchIcon>
          </SearchBar>
        )}

        <RightContainer>
          <NavBtn onClick={()=>navigate("/login")}>
            <p>Hello,</p>
            <p>{user ? user.username : 'Guest'}</p>
          </NavBtn>
          <NavBtn onClick={()=>navigate("/orders")}>
            <p>Return</p>
            <p>& Order</p>
          </NavBtn>
          <Basket onClick={() => navigate("/checkout")}>
            <img src="/basket-icon.png" alt="Basket" />
            <p>{basket?.length}</p>
          </Basket>
        </RightContainer>

      </Inner>
      {isHomePage && (
        <MobileSearch>
          <input 
            type="text" 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)} 
            placeholder='Search' />
          <SearchIcon>
            <img src="/searchIcon.png" alt="SearchIcon" />
          </SearchIcon>
        </MobileSearch>
       )}
    </Container>
  )
};


// Styled Components

const Container = styled.div`
  padding: 0;
  margin: 0;
  width: 100%;
  height: fit-content;
  background-color: #131921;
  // box-shadow:0 0 6px cyan inset;
  display: flex;
  align-items: center;
  // position: relative;
  position: fixed; 
  top: 0; 
  z-index: 1000;


  @media only screen and (max-width:768px){
    flex-direction: column;
  }
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-y:hidden;

  @media only screen and (max-width:768px){
    justify-content: space-between;
  }
`;

const Logo = styled.div`
  margin-left: 20px;
  cursor: pointer;
  z-index:2;
  background-color:transparent;
  img{
    width: 100px;
    margin-top: 10px;

  }
`;

const SearchBar = styled.div`
  height: 35px;
  flex: 1;
  margin: 0px 15px;
  display: flex;
  align-items: center;

  input{
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 14px;
    border-radius: 5px 0px 0px 5px;
    padding-left: 8px;
    
    &:focus{
      outline: none;
    }
  }
  
  @media only screen and (max-width:768px){
    display: none;
  }
`;

const SearchIcon = styled.div`
  background-color: #febd69;
  height: 100%;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 5px 5px 0px;
  cursor: pointer;

  img{
    width: 22px;
  }
`;


const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  justify-content: space-around;
  height: 100%;
  padding: 5px 15px;
  margin-right:12px;

`;

const NavBtn = styled.div`
color: #fff;
padding: 5px;
height: 80%;
display: flex;
flex-direction: column;
justify-content: center;
cursor: pointer;
margin-right: 15px;

p{
  margin: 0 0;
  padding: 0;

  &:nth-child(1) {
    font-size: 14px;
  }

  &:nth-child(2) {
    font-size: 16px;
    font-weight: 650;
  }

  @media only screen and (max-width:396px){
    &:nth-child(1) {
      font-size: 12px;
    }
  
    &:nth-child(2) {
      font-size: 12px;
      font-weight: 550;
    }
  }
}
`;

const Basket = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  cursor: pointer;
  padding:0 5px;

  img{
    width: 30px;
    margin-right: 10px;
  }

  p{
    color: #fff;
    font-weight: 500;
  }
`;

const MobileSearch = styled.div`
  height: 35px;
  width: 90%;
  display: flex;
  align-items: center;
  padding: 10px;

  input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 5px 0px 0px 5px;
    padding-left: 10px;
    
    &:focus{
      outline: none;
    }
  }

  @media only screen and (min-width: 769px) {
    display: none;
  }
`;

export default Navbar;
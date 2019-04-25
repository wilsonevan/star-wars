import React from "react";
import styled from "styled-components";
import "../fonts/Fonts.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <HomeContainer>
      <HomeHeader>Welcome to the Star Wars Database</HomeHeader>
      <Link to="/people">
        <StarButton>Explore</StarButton>
      </Link>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: auto;
`;

const HomeHeader = styled.h1`
  color: yellow
  font-weight: 500 !important;
  font-size: 7rem;
  text-align: center;
`;

const StarButton = styled.button`
  padding: 20px 100px 20px 100px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffd700;
  border-top: 1px solid #ffd700;
  border-bottom: 1px solid #ffd700;
  border-left: 0px;
  border-right: 0px;
  font-family: "Star Jedi Solid" !important;
  font-size: 2rem;
  letter-spacing: 8rem !important;
`;

export default Home;

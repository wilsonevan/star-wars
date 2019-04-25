/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";
import "../fonts/Fonts.css";
import { Link } from "react-router-dom";

const Planet = () => {
  const [planet, setPlanet] = useState("");

  useEffect(() => {
    const planetId = location.pathname;
    axios.get(`https://swapi.co/api${planetId}`).then(res => {
      setPlanet(res.data);
    });
  });

  const getPlanetDiameter = planetDiameter => {
    const planetScaler = 200000;
    const diameter = parseInt(planetDiameter);
    const wWidth = window.innerWidth;

    // Calculate the proportional diameter
    const newDiameter = (wWidth / 2) * (diameter / planetScaler);
    return newDiameter;
  };

  return (
    <>
      <Link to="/people">
        <BackButton>Go Back</BackButton>
      </Link>
      {planet.name ? (
        <PageContainer>
          <PlanetContainer>
            <PlanetCircle inputWidth={getPlanetDiameter(planet.diameter)}>
              {Object.entries(planet).map((item, index) => {
                // Format Titles
                let title = item[0];
                let value = item[1];
                title = title.split("_");

                title = title.map(word => {
                  const capWord = word.charAt(0).toUpperCase() + word.slice(1);
                  return capWord;
                });

                title = title.join("_").replace("_", " ");

                if (title === "Name") return <PlanetName>{value}</PlanetName>;
                else if (index < 9)
                  return (
                    <Data>
                      {title} - {value}
                    </Data>
                  );
              })}
            </PlanetCircle>
          </PlanetContainer>
        </PageContainer>
      ) : (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
    </>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const PlanetContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlanetName = styled.h1`
  text-align: center;
`;

const PlanetCircle = styled.div`
  height: ${props => props.inputWidth || 50}rem;
  width: ${props => props.inputWidth || 50}rem;
  border-radius: 50%;
  border: 1px solid black;
  background-color: white;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 50px;
`;

const Data = styled.h2`
  text-align: center;
  margin: 0px;
`;

const BackButton = styled.button`
  position: absolute;
  top: 10%;
  left: 10%;
  padding: 20px 20px 20px 20px;
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffd700;
  border-top: 1px solid #ffd700;
  border-bottom: 1px solid #ffd700;
  border-left: 0px;
  border-right: 0px;
  font-family: "Star Jedi Solid" !important;
  font-size: 1rem;
  letter-spacing: 1rem !important;
`;

export default Planet;

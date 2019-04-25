/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";


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
  justify-content: space-around;
  padding: 50px;
`;

const PlanetData = styled.div`
  text-align: center;
`;

const Data = styled.h2`
  text-align: center;
  margin: 0px;
`;



export default Planet;

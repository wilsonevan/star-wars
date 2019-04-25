/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dimmer, Loader } from "semantic-ui-react";
import styled from "styled-components";
import Particles from "react-particles-js";

const Planet = () => {
  const [planet, setPlanet] = useState("");

  useEffect(() => {
    const planetId = location.pathname;
    axios.get(`https://swapi.co/api${planetId}`).then(res => {
      setPlanet(res.data);
    });
  });

  const getPlanetDiameter = () => {
    
  }

  return (
    <>
      {planet.name ? (
        <PageContainer>
          <Particles params={particleParams} style={particleStyles} />
          <PlanetContainer>
            <PlanetCircle inputWidth={getPlanetDiameter(planet.diameter)}>
              <PlanetData>
                {Object.entries(planet).map((item, index) => {
                  // Format Titles
                  let title = item[0];
                  let value = item[1];
                  title = title.split("_");

                  title = title.map(word => {
                    const capWord =
                      word.charAt(0).toUpperCase() + word.slice(1);
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
              </PlanetData>
            </PlanetCircle>
          </PlanetContainer>
        </PageContainer>
      ) : (
        <Dimmer active inverted>
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
`;

const PlanetData = styled.div`
  text-align: center;
`;

const Data = styled.h2``;

const particleStyles = {
  width: "100vh",
  height: "100vh",
  position: "absolute",
  zIndex: "-100",
  backgroundColor: "black"
  // backgroundImage: `url(${logo})`
};

const particleParams = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  }
};

export default Planet;

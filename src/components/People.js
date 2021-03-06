import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Dimmer, Loader } from "semantic-ui-react";
import "../fonts/Fonts.css";

const People = () => {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  // const [homeworldIds, setHomeworldIds] = useState([]);

  useEffect(() => {
    // Get all of the people, and set their data
    axios.get("https://swapi.co/api/people/").then(res => {
      setPeople(res.data.results);
      // const characters = res.data.results.map(person => {
      //   return axios.get(person.homeworld).then(res => {
      //     // return [
      //     //   ...people,
      //     //   {
      //     //     ...person,
      //     //     homeworldId: id,
      //     //     homeworldName: res.data.name
      //     //   }
      //     // ];
      //   });
      // });
    });

    // Get all of the planets
    axios.get("https://swapi.co/api/planets/").then(res => {
      setPlanets(res.data.results);
    });
  }, []);

  // Find the correspodning name of the planet from it's URI.
  // IMPORTANT NOTE - API does not correctly return all planet names,
  // so if there is no matching URI, then find the name via axios request directly.
  const findPlanetName = planetURI => {
    if (planets.length > 0) {
      let foundPlanet = false;

      let planetName = planets.map(planet => {
        if (planet.url === planetURI) {
          foundPlanet = true;
          return planet.name;
        }
      });

      if (!foundPlanet) {
        planetName = addNewPlanet(planetURI);
      }

      return planetName;
    }
  };

  // Find the ID from the planet URI, so it can be used for routing purposes
  const getHomeworldId = homeworld => {
    let id = homeworld.split("");

    id = id.map(char => {
      return char.replace(/[^0-9]/, "");
    });

    return (id = id.join(""));
  };

  const addNewPlanet = planetURI => {
    axios.get(planetURI).then(res => {
      setPlanets([...planets, res.data.name]);
      return res.data.name;
    });
  };
  return (
    <>
      <PeopleHeader>Characters</PeopleHeader>
      {people.length > 0 ? (
        <PeopleList>
          {people.map((person, index) => {
            return (
              <Person>
                <Link to={`/planets/${getHomeworldId(person.homeworld)}`}>
                  <Name>{person.name}</Name>
                </Link>{" "}
                -{" "}
                <Link>
                  <Planet>{person.homeworldName}</Planet>
                </Link>
              </Person>
            );
          })}
        </PeopleList>
      ) : (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
    </>
  );
};

const PeopleHeader = styled.h1`
  text-align: center;
  font-size: 3rem;
  letter-spacing: 2rem !important;
`;

const PeopleList = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Person = styled.div`
  padding: 5px;
`;

const Name = styled.h2`
  font-size: 1.5rem;
  color: #ffd700;
  font-family: "Star Jedi Solid" !important;
`;

const Planet = styled.h2``;

export default People;

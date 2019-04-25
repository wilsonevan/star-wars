import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import People from "./components/People";
import Home from "./components/Home";
import Planet from "./components/Planet";
import NoMatch from "./components/NoMatch";
import Particles from "react-particles-js";
import { GlobalStyles } from "./styles/GlobalStyles";
import { particleParams, particleStyles } from "./styles/ParticlesStyles";

const App = () => {
  return (
    <PageContainer>
      <GlobalStyles />
      <Particles params={particleParams} style={particleStyles} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/planets/:id" component={Planet} />
        <Route exact path="/people" component={People} />
        <Route component={NoMatch} />
      </Switch>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px;
`;

export default App;

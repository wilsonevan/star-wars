import React from "react";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";
import People from "./components/People";
import Home from "./components/Home";
import Planet from "./components/Planet";
import NoMatch from "./components/NoMatch";


const App = () => {
  return (
    <PageContainer>
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;

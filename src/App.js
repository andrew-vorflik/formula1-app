import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Race from "./components/Race/Race";
import Qualification from "./components/Qualification/Qualification";
import Circuit from "./components/Circuit/Circuit";
import NotFound from "./components/NotFound/NotFound";
import SeasonList from "./components/SeasonList/SeasonList";
import { MainContent, AsideMenu, AppStyled } from "./App.styled";

function App() {
  return (
    <AppStyled>
      <AsideMenu>
        <SeasonList />
      </AsideMenu>
      <MainContent>
        <Switch>
          <Route path="/" component={Race} exact>
            <Redirect to="/race/8" />
          </Route>
          <Route path="/race/:id" component={Race} exact />
          <Route path="/race/:id/qualification/" component={Qualification} />
          <Route path="/race/:id/circuit/" component={Circuit} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </MainContent>
    </AppStyled>
  );
}

export default App;

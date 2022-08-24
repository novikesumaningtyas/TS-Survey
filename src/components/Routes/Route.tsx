import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import surveyData from "../../fixtures/survey.json";
import SurveyDetails from './../Content/SurveyDetails';
function AppRoute() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={Dashboard} />
          <Route path="/survey/:id" exact={true}>
            <SurveyDetails data={[surveyData]} />
            </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default AppRoute;

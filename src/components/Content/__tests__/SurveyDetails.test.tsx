import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SurveyDetails from "../SurveyDetails";
import surveyData from "../../../fixtures/survey.json";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";

interface ISurveyTest {
  children?: React.ReactNode;
}

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
}))

describe("Survey Details", () => {
  const renderWithRouter = (component: any) => {
    const history = createMemoryHistory({
      initialEntries: ["/survey/2"],
    });

    const Wrapper = ({ children }: ISurveyTest) => (
      <>
        <Router history={history}>
          <Route path="/survey/:id">{children}</Route>
        </Router>
      </>
    );

    return {
      ...render(component, { wrapper: Wrapper }),
      history,
    };
  };

  it("Should render Survey Details Page", async () => {
    renderWithRouter(<SurveyDetails data={[surveyData]} />);

    expect(screen.getByText("Question")).toBeInTheDocument();
    expect(screen.getByText("Rating Average ( 1 - 5 )")).toBeInTheDocument();
    expect(await screen.findByTestId("question-6-average")).toHaveTextContent("4.24");
  });
});

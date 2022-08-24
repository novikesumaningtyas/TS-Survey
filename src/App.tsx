import React from 'react';
import './App.css';
import surveyData from "./fixtures/survey.json"
import AppRoute from './components/Routes/Route';
import { Container } from 'semantic-ui-react';
import { Wrapper } from './lib/styles';

function App() {
  console.log("survey", surveyData);
  return (
    <div className="App">
      <Container  fluid>
        <Wrapper>

      
      <h1>Culture Amp</h1>
      <h2>{surveyData.name}</h2>
      <div data-testid="question-15-average">Enter average here</div>
      <AppRoute/>
      </Wrapper>
      </Container>
     
    </div>
  );
}

export default App;

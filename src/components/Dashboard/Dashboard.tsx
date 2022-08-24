import React from "react";
import surveyData from "../../fixtures/survey.json";
import { Card, Icon, Image } from "semantic-ui-react";
import { ISurvey } from "./../../lib/types";
import image from "../../lib/images/people.png";
import { useHistory } from "react-router";

function Dashboard() {
  const data: ISurvey[] = [surveyData];
  const history = useHistory();

  const getParticipation = (participant: number, response: number): string => {
    const participation = ((response / participant) * 100).toFixed(2);
    return participation;
  };

  const getExtra = (participant: number, response: number) => {
    return (
      <>
        <Icon name="user" />
        {participant}
        <Icon
          name="edit"
          style={{ paddingLeft: "24px", paddingRight: "18px" }}
        />
        {response}
      </>
    );
  };

  const getImage = () => {
    return <Image src={image} alt="logo" />;
  };

  const handleSelect = (surveyId: number) => {
    history.push(`/survey/${surveyId}`);
  };

  return (
    <>
    
      {data &&
        data.map((survey, index) => {
          return (
            <Card
              onClick={() => handleSelect(survey.id)}
              image={getImage()}
              header={survey.name}
              description={`Participation: ${getParticipation(
                survey.participant_count,
                survey.submitted_response_count
              )}%`}
              extra={getExtra(
                survey.participant_count,
                survey.submitted_response_count
              )}
            />
          );
        })}
     
    </>
  );
}

export default Dashboard;

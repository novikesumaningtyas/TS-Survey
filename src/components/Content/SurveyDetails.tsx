import React, { useState } from "react";
import { ISurvey } from "./../../lib/types";
import {
  Table,
  TableCell,
  Pagination,
  Button,
} from "semantic-ui-react";
import { isEmpty } from "lodash";
import { useParams } from "react-router";
import { useHistory } from "react-router";

interface ISurveyData {
  data: ISurvey[];
}

function SurveyDetails({ data }: ISurveyData) {
  console.log("data", data);
  const history = useHistory();
  let { id = -1 } = useParams<{ id: string }>();
  const selectedSurvey = data.filter(
    (survey) => String(survey.id) === String(id)
  );
  const { questions } = selectedSurvey[0];

  const getAverageRating = (questionId: number) => {
    const question = questions.filter((item) => item.id === questionId);
    const validRating = !isEmpty(question)
      ? question[0].survey_responses.filter(
          (answer) => answer.response_content !== ""
        )
      : [];
    const totalValidResponse = validRating.length;
    const totalValidRating = validRating.reduce(
      (previousValue, currentValue) =>
        previousValue + parseInt(currentValue.response_content),
      0
    );

    const averageRating =
      totalValidResponse !== 0 && totalValidRating !== 0
        ? (totalValidRating / totalValidResponse).toFixed(2)
        : 0;
    return averageRating;
  };

  const [page, setPage] = useState(1);
  const itemPerPage = 5;
  const totalPages = Math.ceil(20 / itemPerPage);
  const items = questions.slice(
    (page - 1) * itemPerPage,
    (page - 1) * itemPerPage + itemPerPage
  );

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell> No.</Table.HeaderCell>
            <Table.HeaderCell> Question</Table.HeaderCell>
            <Table.HeaderCell> Rating Average ( 1 - 5 )</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {!isEmpty(items) &&
            items.map((item, index) => {
              return (
                <Table.Row>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <TableCell data-testid={`question-${item.id}-average`}>{getAverageRating(item.id)}</TableCell>
                </Table.Row>
              );
            })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Button
                content="Back to Dashboard"
                icon="left arrow"
                labelPosition="left"
                onClick={() => history.push("/")}
              />
              <Pagination
                floated="right"
                activePage={page}
                totalPages={totalPages}
                siblingRange={1}
                onPageChange={(e, { activePage }) => {
                  setPage(activePage as number);
                }}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
}

export default SurveyDetails;

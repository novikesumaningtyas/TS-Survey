

export interface ISurvey {
  name: string;
  id: number;
  participant_count: number;
  submitted_response_count: number;
  questions: IQuestion[];
}


export interface IQuestion {
  id: number;
  description: string;
  question_type: string;
  survey_responses: ISurveyResponse[];
}

export interface ISurveyResponse {
  id: number;
  question_id: number;
  respondent_id: number;
  response_content: string;
}


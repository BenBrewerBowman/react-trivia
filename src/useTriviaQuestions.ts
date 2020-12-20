import useFetch from "use-http";
import TriviaQuestion from "./TriviaQuestion";
import { TriviaQuestionsResponse } from "./types";

export const TRIVIA_QUESTIONS_ENDPOINT =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

const formatQuestion = (question: string) => {
  return (
    question
      // double quote
      .replace(/&quot;/g, '"')
      // apostrophe
      .replace(/&#039;/g, "'")
      .replace(/&epsilon;/g, "ε")
      .replace(/&Phi;/g, "ϕ")
      .replace(/&Aring;/g, "Å")
  );
};

export const useTriviaQuestions = () => {
  const { response, loading, error } = useFetch<TriviaQuestionsResponse>(
    TRIVIA_QUESTIONS_ENDPOINT,
    {},
    []
  );

  return {
    triviaQuestions: (response.data?.results || []).map(
      ({ question, ...q }) => ({
        ...q,
        question: formatQuestion(question),
      })
    ),
    loading,
    error,
  };
};

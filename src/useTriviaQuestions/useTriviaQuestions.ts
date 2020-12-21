import { useEffect } from "react";
import useFetch, { CachePolicies } from "use-http";
import { TriviaQuestionsResponse } from "../types";

export const TRIVIA_QUESTIONS_ENDPOINT =
  "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean";

const formatQuestion = (question: string) => {
  return question
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&epsilon;/g, "ε")
    .replace(/&Phi;/g, "ϕ")
    .replace(/&Aring;/g, "Å")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”");
};

export const useTriviaQuestions = () => {
  const { response, loading, error, get } = useFetch<TriviaQuestionsResponse>(
    TRIVIA_QUESTIONS_ENDPOINT,
    {
      cachePolicy: CachePolicies.NO_CACHE,
    }
  );

  useEffect(() => {
    get();
  }, [get]);

  return {
    triviaQuestions: (response.data?.results || []).map(
      ({ question, ...q }) => ({
        ...q,
        question: formatQuestion(question),
      })
    ),
    loading,
    error,
    refetch: get,
  };
};

import { useTriviaQuestions } from "./useTriviaQuestions";
import { renderHook } from "@testing-library/react-hooks";
import { v4 as uuid } from "uuid";

jest.mock("use-http");
import useFetch from "use-http";
import { TriviaQuestion } from "../types";

beforeEach(jest.resetAllMocks);

describe("useTriviaQuestions", () => {
  it("loads", () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: true,
      response: {
        data: undefined,
      },
      get: jest.fn(),
    });
    const { result } = renderHook(() => useTriviaQuestions());
    expect(result.current.loading).toBeTruthy();
  });

  it("errors", () => {
    const error = new Error("error");
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      error,
      response: {
        data: undefined,
      },
      get: jest.fn(),
    });
    const { result } = renderHook(() => useTriviaQuestions());
    expect(result.current.error).toBe(error);
  });

  it("fetches trivia questions", () => {
    const get = jest.fn();
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      response: {
        data: undefined,
      },
      get,
    });
    renderHook(() => useTriviaQuestions());
    expect(get).toHaveBeenCalled();
  });

  it("defaults trivia questions to empty array", () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      response: {
        data: undefined,
      },
      get: jest.fn(),
    });
    const { result } = renderHook(() => useTriviaQuestions());
    expect(result.current.triviaQuestions).toEqual([]);
  });

  it("fetches and returns trivia questions", () => {
    const TRIVIA_QUESTIONS: TriviaQuestion[] = [
      {
        category: uuid(),
        type: "boolean",
        difficulty: "hard",
        question: uuid(),
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: uuid(),
        type: "boolean",
        difficulty: "hard",
        question: uuid(),
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: uuid(),
        type: "boolean",
        difficulty: "hard",
        question: uuid(),
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
    ];
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      response: {
        data: {
          results: TRIVIA_QUESTIONS,
        },
      },
      get: jest.fn(),
    });
    const { result } = renderHook(() => useTriviaQuestions());
    expect(result.current.triviaQuestions).toEqual(TRIVIA_QUESTIONS);
  });

  it("formats trivia questions question", () => {
    const TRIVIA_QUESTIONS: TriviaQuestion[] = [
      {
        category: uuid(),
        type: "boolean",
        difficulty: "hard",
        question: "&quot;&#039;&epsilon;&Phi;&Aring;&ldquo;&rdquo;",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
    ];
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      response: {
        data: {
          results: TRIVIA_QUESTIONS,
        },
      },
      get: jest.fn(),
    });
    const { result } = renderHook(() => useTriviaQuestions());
    expect(result.current.triviaQuestions[0].question).toEqual(`"'εϕÅ“”`);
  });

  it("refetches", () => {
    const get = jest.fn();
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      response: {
        data: undefined,
      },
      get,
    });
    const { result } = renderHook(() => useTriviaQuestions());
    expect(result.current.refetch).toBe(get);
  });
});

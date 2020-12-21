import { Typography } from "@material-ui/core";
import { shallow } from "enzyme";
import GradientButton from "../gradientButton/GradientButton";
import TriviaQuestion from "./TriviaQuestion";
import { v4 as uuid } from "uuid";
import { TriviaQuestion as T_TriviaQuestion } from "../types";

const defaultProps = {
  question: {
    question: uuid(),
  } as T_TriviaQuestion,
  onSelectAnswer: jest.fn(),
};

describe("TriviaQuestion", () => {
  it("shows question", () => {
    const question = { question: uuid() } as T_TriviaQuestion;
    const wrapper = shallow(
      <TriviaQuestion {...defaultProps} question={question} />
    );
    expect(wrapper.find(Typography).first().text()).toBe(question.question);
  });

  it("has selectable true", () => {
    const onSelectAnswer = jest.fn();
    const wrapper = shallow(
      <TriviaQuestion {...defaultProps} onSelectAnswer={onSelectAnswer} />
    );
    wrapper.find(GradientButton).first().invoke("onClick")?.();
    expect(onSelectAnswer).toHaveBeenCalledWith("True");
  });

  it("has selectable false", () => {
    const onSelectAnswer = jest.fn();
    const wrapper = shallow(
      <TriviaQuestion {...defaultProps} onSelectAnswer={onSelectAnswer} />
    );
    wrapper.find(GradientButton).last().invoke("onClick")?.();
    expect(onSelectAnswer).toHaveBeenCalledWith("False");
  });
});

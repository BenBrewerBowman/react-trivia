import { Typography } from "@material-ui/core";
import { shallow } from "enzyme";
import GradientButton from "../gradientButton/GradientButton";
import { TriviaQuestion, TriviaQuestionAnswer } from "../types";
import Results from "./Results";

const props = {
  questions: [
    ...new Array(5).fill({
      correct_answer: "True",
      question: "True question",
    }),
    ...new Array(5).fill({
      correct_answer: "False",
      question: "False question",
    }),
  ] as TriviaQuestion[],
  userAnswers: [
    "True",
    "False",
    "True",
    "False",
    "True",
    "False",
    "True",
    "False",
    "True",
    "False",
  ] as TriviaQuestionAnswer[],
  onSelectRestart: jest.fn(),
};

describe("Results", () => {
  it("shows number correctly answered", () => {
    const wrapper = shallow(<Results {...props} />);
    expect(
      wrapper.find(Typography).first().text().includes("6/10")
    ).toBeTruthy();
  });

  it("shows each correct answer and each incorrect", () => {
    const wrapper = shallow(<Results {...props} />);
    props.questions.forEach((q, i) => {
      const trueFalseButton = wrapper.find(GradientButton).at(i);
      expect(trueFalseButton.find(Typography).text()).toEqual(
        q.correct_answer.charAt(0).toUpperCase()
      );
      expect(
        wrapper
          .find(Typography)
          .at((i + 1) * 2)
          .text()
      ).toEqual(q.question);
    });
  });

  it("restarts the app", () => {
    const onSelectRestart = jest.fn();
    const wrapper = shallow(
      <Results {...props} onSelectRestart={onSelectRestart} />
    );
    expect(wrapper.find(GradientButton).last().props().onClick).toBe(
      onSelectRestart
    );
  });
});

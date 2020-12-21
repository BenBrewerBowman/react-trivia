import { Step, Stepper } from "@material-ui/core";
import { shallow } from "enzyme";
import TriviaQuestionsStepper from "./TriviaQuestionsStepper";

describe("TriviaQuestionsStepper", () => {
  it("shows 10 steps", () => {
    const wrapper = shallow(<TriviaQuestionsStepper activeStep={0} />);
    expect(wrapper.find(Step)).toHaveLength(10);
  });

  it("shows active step", () => {
    const activeStep = 5;
    const wrapper = shallow(<TriviaQuestionsStepper activeStep={activeStep} />);
    expect(wrapper.find(Stepper).props().activeStep).toBe(activeStep);
  });
});

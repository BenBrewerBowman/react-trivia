import { shallow } from "enzyme";
import GradientButton from "./GradientButton";
import { Card } from "@material-ui/core";

describe("GradientButton", () => {
  it("renders button content", () => {
    const content = "Click me";
    const wrapper = shallow(<GradientButton>{content}</GradientButton>);
    expect(wrapper.find(Card).text()).toBe(content);
  });

  it("is clickable", () => {
    const click = jest.fn();
    const wrapper = shallow(
      <GradientButton onClick={click}>
        <div />
      </GradientButton>
    );
    expect(wrapper.find(Card).props().onClick).toBe(click);
  });

  it("can be disabled", () => {
    const disabled = true;
    const click = jest.fn();
    const wrapper = shallow(
      <GradientButton onClick={click} disabled={disabled}>
        <div />
      </GradientButton>
    );
    expect(wrapper.find(Card).props().onClick).toBeUndefined();
  });
});

import { shallow } from "enzyme";
import GradientButton from "../gradientButton/GradientButton";
import MainMenu from "./MainMenu";

describe("MainMenu", () => {
  it("starts trivia", () => {
    const start = jest.fn();
    const wrapper = shallow(<MainMenu onSelectStart={start} />);
    expect(wrapper.find(GradientButton).props().onClick).toBe(start);
  });
});

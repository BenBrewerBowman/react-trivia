import ErrorMessage from "./ErrorMessage";
import { shallow } from "enzyme";

describe("ErrorMessage", () => {
  it("renders error message content", () => {
    const error = "Oops, there was an error.";
    const wrapper = shallow(<ErrorMessage>{error}</ErrorMessage>);
    expect(wrapper.text()).toBe(error);
  });
});

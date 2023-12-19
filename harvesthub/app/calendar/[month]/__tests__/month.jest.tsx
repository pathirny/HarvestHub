import { render, screen } from "@testing-library/react";
import Month from "../page";
// check the buttons appear
describe("Month", () => {
  it("should render a back button", async () => {
    // arrange the test
    render(<Month />);

    // actions
    const myButton = screen.getByText("Back", { selector: "button" });
    // assert
    expect(myButton).toBeInTheDocument();
  });
});

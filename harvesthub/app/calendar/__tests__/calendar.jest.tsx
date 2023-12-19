import { render, screen } from "@testing-library/react";
import Calendar from "../page";
// check the buttons appear
describe("Calendar", () => {
  it("should render january label", async () => {
    // arrange the test
    render(<Calendar />);

    // actions
    const january = screen.getByText("January");
    // assert
    expect(january).toBeInTheDocument();
  });
});

// check the buttons appear
describe("Calendar", () => {
  it("should render a back button", async () => {
    // arrange the test
    render(<Calendar />);

    // actions
    const myButton = screen.getByText("Back", { selector: "button" });
    // assert
    expect(myButton).toBeInTheDocument();
  });
});

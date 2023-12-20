import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TipsnTricks from "../page";

// check the buttons appear
describe("Tips and Tricks", () => {
  it("should render a back button", async () => {
    // arrange the test
    render(<TipsnTricks />);

    // actions
    const myButton = screen.getByText("Back", { selector: "button" });
    // assert
    expect(myButton).toBeInTheDocument();
  });
});

// check the buttons appear
describe("Tips and Tricks", () => {
  it("should render a search bar", async () => {
    // arrange the test
    render(<TipsnTricks />);

    // actions
    const searchBar = screen.getByPlaceholderText("Search 🔍");
    // assert
    expect(searchBar).toBeInTheDocument();
  });
});

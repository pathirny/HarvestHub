import { render, screen } from "@testing-library/react";
import Settings from "../page";

// check signout button renders
describe("Settings", () => {
  it("Should render the signout button", () => {
    // arrange the rest
    render(<Settings />);
    //action
    const signoutButton = screen.getByText("Sign Out");
    // assert
    expect(signoutButton).toBeInTheDocument();
  });
});

// check Change Theme button renders
describe("Settings", () => {
  it("Should render the change theme button", () => {
    // arrange the rest
    render(<Settings />);
    //action
    const signoutButton = screen.getByText("Change Theme");
    // assert
    expect(signoutButton).toBeInTheDocument();
  });
});

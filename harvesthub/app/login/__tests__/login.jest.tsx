import { render, screen } from "@testing-library/react";
import Login from "../page";

//check forgot your password renders
describe("Login", () => {
  it("Should render forgot your password", async () => {
    // arange the test
    render(<Login />);
    // action
    const element = screen.getByText("Forgot your password?");
    //assert
    expect(element).toBeInTheDocument();
  });
});

//check logo image
describe("Login", () => {
  it("Should render the harvesthub logo alt text", async () => {
    // arange the test
    render(<Login />);
    // action
    const logoImage = screen.getByAltText("harvestHub Logo");
    //assert
    expect(logoImage).toBeInTheDocument();
  });
});

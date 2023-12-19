import { render, screen } from "@testing-library/react";
import Index from "@/app/page";
import { createBrowserClient } from "@supabase/ssr";

jest.mock("@supabase/ssr");
jest.mock("../components/hooks/useCheckSignedIn", () => {
  return jest.fn(() => [true]);
});

describe("Home", () => {
  it("Page should have text - Growing Calendar - on page", async () => {
    //arrange for the test
    render(<Index />);

    //action
    const myElm = screen.getByText("Growing Calendar");

    //ascertain
    expect(myElm).toBeInTheDocument();
  });
});

describe("Home Tips and tricks", () => {
  it("Page should have the Tips and tricks button", async () => {
    // arrange for the test
    render(<Index />);
    // action
    const tips = screen.getByText("Tips and Tricks");

    // assertion
    expect(tips).toBeInTheDocument();
  });
});

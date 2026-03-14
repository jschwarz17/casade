import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Casade");
  });

  it("renders the welcome message", () => {
    render(<Home />);
    expect(
      screen.getByText(/Welcome to Casade/)
    ).toBeInTheDocument();
  });

  it("renders documentation and GitHub links", () => {
    render(<Home />);
    expect(screen.getByText("Documentation")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });
});

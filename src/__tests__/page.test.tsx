import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders only the hero image and audio hotspot", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: "Play theme song" })).toBeInTheDocument();
    const heroImage = screen.getByRole("presentation");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", expect.stringContaining("casade-hero.jpg"));
    expect(screen.queryByText("Documentation")).not.toBeInTheDocument();
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();
    expect(screen.queryByText("Welcome to Casade")).not.toBeInTheDocument();
  });
});

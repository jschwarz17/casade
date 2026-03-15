import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";

describe("Home page", () => {
  it("renders the hero image with click-to-play video hotspot", async () => {
    const playSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(() => Promise.resolve());
    const pauseSpy = jest.spyOn(window.HTMLMediaElement.prototype, "pause").mockImplementation();

    render(<Home />);
    expect(screen.getByRole("button", { name: "Play Casa video" })).toBeInTheDocument();
    const heroImage = screen.getByRole("presentation");
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", expect.stringContaining("casade-hero.jpg"));
    expect(screen.queryByText("Documentation")).not.toBeInTheDocument();
    expect(screen.queryByText("GitHub")).not.toBeInTheDocument();
    expect(screen.queryByText("Welcome to Casade")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Play Casa video" }));

    await waitFor(() => {
      expect(document.querySelector("video")).toBeInTheDocument();
    });

    const video = document.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(playSpy).toHaveBeenCalled();

    if (video) {
      fireEvent.ended(video);
    }

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Play Casa video" })).toBeInTheDocument();
    });
    expect(pauseSpy).toHaveBeenCalled();

    playSpy.mockRestore();
    pauseSpy.mockRestore();
  });
});

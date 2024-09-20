import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingPage from "../pages/Landing/Landing";

it("renders", async () => {
    // Arrange
    render(<LandingPage />)

    // Act
    await screen.findByRole("heading");

    // Assert
    expect(screen.getByRole("heading")).toHaveTextContent("New Game");
})
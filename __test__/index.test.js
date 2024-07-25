import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders all links and footer", () => {
    render(<Home />);

    // Check for Hangman link
    const hangmanLink = screen.getByRole("link", { name: /hangman/i });
    expect(hangmanLink).toBeInTheDocument();
    expect(hangmanLink).toHaveAttribute("href", "/hangman");

    // Check for Wordle link
    const wordleLink = screen.getByRole("link", { name: /wordle/i });
    expect(wordleLink).toBeInTheDocument();
    expect(wordleLink).toHaveAttribute("href", "/wordle");

    // Check for Blackjack link
    const blackjackLink = screen.getByRole("link", { name: /blackjack/i });
    expect(blackjackLink).toBeInTheDocument();
    expect(blackjackLink).toHaveAttribute("href", "/blackjack");

    // Check for footer text
    const footerText = screen.getByText(/made with ❤️/i);
    expect(footerText).toBeInTheDocument();
  });
});

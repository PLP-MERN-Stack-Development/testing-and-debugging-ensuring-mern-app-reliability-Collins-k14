// src/tests/unit/Card.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../../components/Card";

describe("Card Component", () => {
  const mockPost = {
    title: "How to Write Clean Code",
    author: "John Doe",
    date: "2025-11-12",
    excerpt: "Learn the principles of clean and maintainable code.",
  };

  it("renders card with post details", () => {
    render(<Card {...mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(mockPost.author))).toBeInTheDocument();
    expect(screen.getByText(mockPost.excerpt)).toBeInTheDocument();
  });

  it("calls onClick when clicked (if provided)", () => {
    const handleClick = vi.fn();
    render(<Card {...mockPost} onClick={handleClick} />);
    fireEvent.click(screen.getByTestId("card"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("renders placeholder when props are missing", () => {
    render(<Card />);
    expect(screen.getByText(/no title/i)).toBeInTheDocument();
    expect(screen.getByText(/unknown author/i)).toBeInTheDocument();
    expect(screen.getByText(/no content/i)).toBeInTheDocument();
  });
});

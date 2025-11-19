// src/tests/unit/Form.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Form from "../../components/Form";

describe("Form Component", () => {
  it("renders form fields", () => {
    render(<Form />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
  });

  it("updates input values on typing", () => {
    render(<Form />);
    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "New Blog Post" } });
    expect(titleInput.value).toBe("New Blog Post");
  });

  it("calls onSubmit with form data", () => {
    const handleSubmit = vi.fn();
    render(<Form onSubmit={handleSubmit} />);
    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      title: "Test Title",
      content: "Test Content",
    });
  });

  it("shows error if required fields are empty", () => {
    render(<Form />);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/title is required/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import Input from "@/components/Input";
import { describe, it, expect, vi } from "vitest";

describe("Input Component", () => {
  it("renders with label and placeholder", () => {
    render(<Input label="Name" placeholder="Enter name" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
  });

  it("accepts and displays a value", () => {
    render(<Input value="Collins" onChange={() => {}} />);
    expect(screen.getByDisplayValue("Collins")).toBeInTheDocument();
  });

  it("calls onChange handler when typing", () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Test" } });
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders in disabled state", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });
});

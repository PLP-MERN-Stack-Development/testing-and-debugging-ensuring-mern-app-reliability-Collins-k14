import { renderHook, act } from "@testing-library/react";
import { useForm } from "../../hooks/useForm";

test("useForm updates form values", () => {
  const { result } = renderHook(() => useForm({ title: "" }));

  act(() => {
    result.current.handleChange({ target: { name: "title", value: "New Title" } });
  });

  expect(result.current.values.title).toBe("New Title");

  act(() => {
    result.current.resetForm();
  });

  expect(result.current.values.title).toBe("");
});

import { renderHook, waitFor } from "@testing-library/react";
import { usePost } from "../../hooks/usePost";
import { vi } from 'vitest';

global.fetch = vi.fn((url) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: "1", title: "Single Post" }),
  })
);

test("usePost fetches a single post successfully", async () => {
  const { result } = renderHook(() => usePost("1"));

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(result.current.post.title).toBe("Single Post");
  expect(result.current.error).toBeNull();
});

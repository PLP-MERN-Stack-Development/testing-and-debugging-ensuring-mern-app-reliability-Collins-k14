import { renderHook, waitFor } from '@testing-library/react';
import { usePosts } from '../../hooks/usePosts';
import { vi } from 'vitest';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, title: "Test Post" }]),
  })
);

test('should fetch posts successfully', async () => {
  const { result } = renderHook(() => usePosts());

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(result.current.posts).toHaveLength(1);
  expect(result.current.posts[0].title).toBe("Test Post");
  expect(result.current.error).toBeNull();
});

import { usePosts } from "../hooks/usePosts";

export const PostList = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

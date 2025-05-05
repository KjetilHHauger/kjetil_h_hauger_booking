import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Blog({ username, limit = 5 }) {
  const API = import.meta.env.VITE_API_URL;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const res = await fetch(`${API}/blog/posts/pensjonistenblog/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { data } = await res.json();
        setPosts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [username, API]);

  if (loading) return <p>Loading posts…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <section className="space-y-6">
      <h2 className="text-heading-5 font-bold">Latest posts by {username}</h2>
      <ul className="space-y-4">
        {posts.map((p) => {
          const { id, title, media, created } = p;
          return (
            <li key={id} className="border rounded p-4 hover:shadow">
              <h3 className="text-heading-6 font-semibold mb-1">
                <Link
                  to={`/blog/${id}`}
                  state={{ post: p }}
                  className="hover:underline"
                >
                  {title}{" "}
                  <span className="text-body-xs text-gray-500">
                    {" "}
                    published {new Date(created).toLocaleDateString()}
                  </span>
                </Link>
              </h3>

              {media?.url && (
                <img
                  src={media.url}
                  alt={media.alt || title}
                  className="max-w-2xl rounded mb-4"
                />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

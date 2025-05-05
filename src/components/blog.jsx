// Blog.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Blog({ username, limit = 5 }) {
  const [posts, setPosts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/blog/posts/pensjonistenblog/`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { data, meta } = await res.json();
        setPosts(data);
        setMeta(meta);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [username, limit]);

  if (loading) return <p>Loading posts…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <section className="space-y-6">
      <h2 className="text-heading-5 font-bold">Latest posts by {username}</h2>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.id} className="border rounded p-4 hover:shadow">
            <h3 className="text-heading-6 font-semibold mb-1">
              <Link to={`/blog/${p.id}`} className="hover:underline">
                {p.title}
              </Link>
            </h3>
            <p className="text-body-sm line-clamp-2">{p.body}</p>
            <div className="mt-2 text-body-xs text-gray-500 flex gap-4">
              <span>{new Date(p.created).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

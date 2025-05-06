import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Blog({ username }) {
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
    <section className="space-y-6 mt-6">
      <ul className="space-y-4 gap-4 flex">
        {posts.map((p) => {
          const { id, title, media, created } = p;
          return (
            <li
              key={id}
              className="bg-amber-500 h-90 w-90 flex flex-col relative"
            >
              {media?.url && (
                <img
                  src={media.url}
                  alt={media.alt || title}
                  className="rounded object-fill"
                />
              )}
              <section className="mt-4 w-90 absolute bottom-0 left-0 text-white bg-black/20">
                <h3 className="text-heading-6 font-semibold h-13 ml-5">
                  <Link
                    to={`/blog/${id}`}
                    state={{ post: p }}
                    className="hover:underline"
                  >
                    {title}{" "}
                  </Link>
                </h3>
                <span className="text-body-xs ml-5">
                  {" "}
                  published {new Date(created).toLocaleDateString()}
                </span>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

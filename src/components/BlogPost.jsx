import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams();
  const API = import.meta.env.VITE_API_URL;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/blog/posts/pensjonistenblog/${id}`, {
          headers: {
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const { data } = await res.json();
        setPost(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [API, id]);

  if (loading) return <p>Loading post…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <article className="prose mx-auto">
      <h1>{post.title}</h1>
      {post.media?.url && (
        <img
          src={post.media.url}
          alt={post.media.alt}
          className="w-full rounded mb-4"
        />
      )}

      <div
        className="blog-body"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
}

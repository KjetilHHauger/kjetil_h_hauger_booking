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
    <article className="flex flex-col items-center justify-between w-full max-w-7xl mx-auto text-brand-primary px-8 sm:px-10 md:px-20">
      <h1 className="text-2xl text-font-headline font-bold mb-6 max-w-3xl">
        {post.title}
      </h1>

      <div
        className="blog-body prose prose-slate max-w-3xl flex flex-col gap-2"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
}

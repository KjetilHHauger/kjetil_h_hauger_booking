import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function Blog({ username }) {
  const API = import.meta.env.VITE_API_URL;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const listRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    update();
    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [posts]);

  const scrollByWidth = (dir = 1) => {
    const el = listRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  if (loading) return <p>Loading posts…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <section className="relative mt-6">
      {canScrollLeft && (
        <button
          onClick={() => scrollByWidth(-1)}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
        >
          <CaretLeft size={24} weight="bold" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scrollByWidth(1)}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
        >
          <CaretRight size={24} weight="bold" />
        </button>
      )}

      <ul ref={listRef} className="flex gap-4 overflow-hidden  px-4">
        {posts.map((p) => {
          const { id, title, media, created } = p;
          return (
            <li
              key={id}
              className="min-w-[400px] w-[400px] flex-shrink-0 flex flex-col rounded-2xl overflow-hidden relative"
            >
              <Link to={`/blog/${id}`} state={{ post: p }} className="block">
                {media?.url && (
                  <img
                    src={media.url}
                    alt={media.alt || title}
                    className="h-[600px] w-full object-cover hover:brightness-90 duration-300"
                  />
                )}
                <section className="absolute bottom-0 left-0 w-full bg-black/20 p-4 text-white">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <span className="text-sm">
                    published {new Date(created).toLocaleDateString()}
                  </span>
                </section>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

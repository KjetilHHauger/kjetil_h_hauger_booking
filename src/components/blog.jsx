import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useSwipeable } from "react-swipeable";

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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => scrollByWidth(1),
    onSwipedRight: () => scrollByWidth(-1),
    preventDefaultTouchmoveEvent: true,
    delta: 10,
  });

  if (loading) return <p>Loading posts…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!posts.length) return <p>No posts yet.</p>;

  return (
    <section className="relative mt-6 w-full max-w-[1920px] mx-auto">
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

      <ul
        {...swipeHandlers}
        ref={listRef}
        className="flex gap-4 overflow-hidden touch-pan-x scrollbar-hide"
      >
        {posts.map((p) => (
          <li
            key={p.id}
            className="min-w-[400px] w-[400px] flex-shrink-0 flex flex-col rounded-2xl overflow-hidden relative"
          >
            <Link to={`/blog/${p.id}`} state={{ post: p }}>
              {p.media?.url && (
                <img
                  src={p.media.url}
                  alt={p.media.alt || p.title}
                  className="h-[600px] w-full object-cover hover:brightness-90 duration-300"
                />
              )}
              <section className="absolute bottom-0 left-0 w-full bg-black/20 p-4 text-white">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <span className="text-sm">
                  published {new Date(p.created).toLocaleDateString()}
                </span>
              </section>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

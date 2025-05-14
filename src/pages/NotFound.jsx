import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto text-brand-primary px-8 sm:px-10 md:px-20 gap-10 my-10">
      <Link to={"/"} className="text-3xl font-bold mb-4">
        <img src="/assets/404.webp" alt="404 page not found" />
      </Link>
    </div>
  );
}

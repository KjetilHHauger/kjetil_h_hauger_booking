import Blog from "../components/Blog";
import HeroVideo from "../components/HeroVideo";
import SearchForm from "../components/SearchForm";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full">
      <HeroVideo>
        <SearchForm />
      </HeroVideo>
      <p className="flex items-center justify-between w-full text-brand-primary">
        <Link
          className="flex items-center gap-2 hover:text-cta-icon-hover text-body-xs"
          to={"/credits"}
          title="Video credits"
        >
          Click here to view video credits
        </Link>
      </p>

      <section className="w-full">
        <Blog username="pensjonistenblog" limit={5} />
      </section>
    </div>
  );
}

import HeroVideo from "../components/HeroVideo";
import SearchForm from "../components/SearchForm";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full mx-auto">
      <HeroVideo>
        <SearchForm />
      </HeroVideo>
      <p className="ml-10">
        <Link
          className="flex items-center gap-2 hover:text-cta-icon-hover text-body-xs"
          to={"/credits"}
          title="Video credits"
        >
          Click here to view video credits
        </Link>
      </p>

      <section className="mx-auto px-4 sm:px-10 md:px-20"></section>
    </div>
  );
}

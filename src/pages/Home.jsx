import HeroVideo from "../components/HeroVideo";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <div className="w-full mx-auto">
      <HeroVideo>
        <SearchForm />
      </HeroVideo>
      <section className="mx-auto px-4 sm:px-10 md:px-20"></section>
    </div>
  );
}

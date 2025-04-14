import HeroVideo from "../components/HeroVideo";
import SearchForm from "../components/SearchForm";

export default function Home() {
  return (
    <div className="w-full mx-auto">
      <HeroVideo />
      <section className="mx-auto px-4 sm:px-10 md:px-20">
        <h1 className="text-2xl font-bold mb-6 mt-6">Plan your next stay</h1>
        <SearchForm />
      </section>
    </div>
  );
}

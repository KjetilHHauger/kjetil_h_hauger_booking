export default function Credits() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <h1 className="text-heading-4 font-bold mb-2">Video credits</h1>
      <p className="mb-4 text-body-sm text-font-secondary">
        Video in order of appearance
      </p>
      <ol className="list-decimal list-inside space-y-2 text-body-md">
        <li>House on cliffside #1. Video by Sora</li>
        <li>
          Drone Footage of a Woman in a Swimming Pool -{" "}
          <a
            href="https://www.pexels.com/video/drone-footage-of-a-woman-in-a-swimming-pool-8906353/"
            className="underline text-brand-secondary hover:text-brand-secondary-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Los Muertos Crew
          </a>
        </li>
        <li>Cabin on mountain #1. Video by Sora</li>
        <li>Cabin on mountain #2. Video by Sora</li>
        <li>
          Hike to Litltinden -{" "}
          <a
            href="https://www.pexels.com/video/hike-to-litltinden-26593926/"
            className="underline text-brand-secondary hover:text-brand-secondary-hover"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alexander Jensen
          </a>
        </li>
        <li>House on cliffside #2. Video by Sora</li>
      </ol>
    </div>
  );
}

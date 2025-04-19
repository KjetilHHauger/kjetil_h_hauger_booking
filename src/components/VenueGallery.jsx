import { useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function VenueGallery({ media }) {
  const [index, setIndex] = useState(0);

  const nextImage = () => {
    setIndex((prev) => (prev + 1) % media.length);
  };

  const prevImage = () => {
    setIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  if (!media?.length) return null;

  return (
    <div className="mb-6">
      {/* Main image */}
      <div className="relative mb-2">
        <img
          src={media[index].url}
          alt={media[index].alt || `Image ${index + 1}`}
          className="w-full h-72 object-cover rounded"
        />
        {media.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-primary p-1 rounded-full shadow"
            >
              <CaretLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-primary p-1 rounded-full shadow"
            >
              <CaretRight size={20} />
            </button>
          </>
        )}
        <div className="absolute bottom-2 right-2 bg-white/70 text-xs px-2 py-1 rounded">
          {index + 1} / {media.length}
        </div>
      </div>

      {/* Thumbnail */}
      <div className="flex gap-2 overflow-x-auto">
        {media.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-16 w-24 flex-shrink-0 rounded overflow-hidden border-2 ${
              i === index ? "border-brand-primary" : "border-transparent"
            }`}
          >
            <img
              src={img.url}
              alt={img.alt || `Thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

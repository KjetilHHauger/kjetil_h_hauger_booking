export default function DetailsTab({ form, onChange }) {
  return (
    <>
      <div>
        <label htmlFor="title" className="block mb-1">
          Title *
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          required
          className="border p-2 rounded w-full h-32"
        />
      </div>

      <div>
        <label htmlFor="price" className="block mb-1">
          Price (max 10000) *
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="0"
          max="10000"
          value={form.price}
          onChange={(e) => onChange("price", e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label htmlFor="maxGuests" className="block mb-1">
          Max guests (max 100) *
        </label>
        <input
          id="maxGuests"
          name="maxGuests"
          type="number"
          min="1"
          max="100"
          value={form.maxGuests}
          onChange={(e) => onChange("maxGuests", e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>
    </>
  );
}

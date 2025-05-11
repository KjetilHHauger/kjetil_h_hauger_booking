export default function DetailsTab({ form, onChange }) {
  return (
    <>
      <div>
        <label className="block mb-1">Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>

      <div>
        <label className="block mb-1">Description *</label>
        <textarea
          name="description"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          required
          className="border p-2 rounded w-full h-32"
        />
      </div>

      <div>
        <label className="block mb-1">Price (max 10000) *</label>
        <input
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
        <label className="block mb-1">Max guests (max 100) *</label>
        <input
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

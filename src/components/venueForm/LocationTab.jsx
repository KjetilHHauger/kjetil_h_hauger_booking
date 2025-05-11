export default function LocationTab({ form, onChange }) {
  return (
    <>
      <div>
        <label className="block mb-1">Address *</label>
        <input
          name="address"
          value={form.address}
          onChange={(e) => onChange("address", e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block mb-1">City *</label>
        <input
          name="city"
          value={form.city}
          onChange={(e) => onChange("city", e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>
      <div>
        <label className="block mb-1">Country *</label>
        <input
          name="country"
          value={form.country}
          onChange={(e) => onChange("country", e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
      </div>
    </>
  );
}

import React, { useState } from "react";

export default function VenueCreate() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
    maxGuests: "",
    address: "",
    city: "",
    country: "",
    rating: "",
    meta: { wifi: false, parking: false, pets: false, breakfast: false },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-heading-4 font-bold mb-6">Create venue</h1>
      <form className="space-y-4 md:w-1/2">
        <div>
          <label className="block mb-1">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
      </form>
    </div>
  );
}

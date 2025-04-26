import React, { useState } from "react";
import {
  WifiHigh,
  LetterCircleP,
  PawPrint,
  ForkKnife,
} from "@phosphor-icons/react";

const metaConfig = [
  { icon: WifiHigh, key: "wifi", label: "Wi-Fi" },
  { icon: LetterCircleP, key: "parking", label: "Parking" },
  { icon: PawPrint, key: "pets", label: "Pets" },
  { icon: ForkKnife, key: "breakfast", label: "Breakfast" },
];

export default function VenueCreate() {
  const [activeTab, setActiveTab] = useState("details");
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

  const handleMetaChange = (e) => {
    const { name, checked } = e.target;
    setForm((f) => ({
      ...f,
      meta: { ...f.meta, [name]: checked },
    }));
  };

  const tabs = [
    { id: "details", label: "Details" },
    { id: "location", label: "Location" },
    { id: "amenities", label: "Amenities" },
    { id: "media", label: "Media" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-heading-4 font-bold mb-6">Create venue</h1>
      <form className="space-y-4 md:w-1/2">
        <div className="flex border-b mb-4">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex-1 py-2 text-center ${
                activeTab === id
                  ? "border-b-2 border-cta font-bold"
                  : "text-gray-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "details" && (
          <>
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
          </>
        )}
        {activeTab === "location" && (
          <>
            <div>
              <label className="block mb-1">Address *</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-1">City *</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Country *</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                required
                className="border p-2 rounded w-full"
              />
            </div>
          </>
        )}
        {activeTab === "amenities" && (
          <>
            <div>
              <label className="block mb-1">Rating (0-5)</label>
              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block mb-1">Amenities</label>
              <div className="flex gap-4">
                {metaConfig.map(({ icon: Icon, key, label }) => (
                  <label key={key} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name={key}
                      checked={form.meta[key]}
                      onChange={handleMetaChange}
                      className="form-checkbox"
                    />
                    <Icon size={24} weight="bold" title={label} />
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
        {activeTab === "media" && (
          <div>
            <label className="block mb-1">Image URL *</label>
            <input
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
        )}
      </form>
    </div>
  );
}

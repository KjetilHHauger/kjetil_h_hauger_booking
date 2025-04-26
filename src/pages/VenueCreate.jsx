import React, { useState } from "react";
import VenueGallery from "../components/VenueGallery";
import MetaIcons from "../components/MetaIcons";
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
  const [showPreview, setShowPreview] = useState(false);

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

  const placeholderText =
    "Tell us about your venue! What makes it special? What can guests expect? ";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-heading-4 font-bold mb-6">Create venue</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <form
          onSubmit={() => {}}
          className={`space-y-4 md:w-1/2 ${
            showPreview ? "hidden md:block" : ""
          }`}
        >
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
          <button
            className="w-full md:hidden mb-4 px-4 py-2 bg-cta text-white rounded"
            onClick={() => setShowPreview((p) => !p)}
          >
            {showPreview ? "Back to form" : "Preview"}
          </button>
          <button
            type="submit"
            className="w-full mt-4 bg-cta text-white py-2 rounded"
          >
            Create venue
          </button>
        </form>
        <div
          className={`${showPreview ? "block" : "hidden"} md:block md:w-1/2`}
          aria-label="Preview"
        >
          <h1 className="text-heading-3 font-bold mb-4 text-font-primary">
            {form.title || "Venue Title"}
          </h1>

          <VenueGallery
            media={
              form.imageUrl
                ? [{ url: form.imageUrl, alt: form.title }]
                : [
                    {
                      url: "https://placehold.co/600x400",
                      alt: "Placeholder Image",
                    },
                  ]
            }
          />

          <section className="flex md:flex-row flex-col gap-6 mt-6">
            <div>
              <p className="mb-4">{form.description || placeholderText}</p>
              <p className="mb-2 font-medium">
                Price: {form.price || "0"} / night
              </p>
              <p className="mb-2 font-medium">
                Max guests: {form.maxGuests || "0"}
              </p>
              <p className="mb-2 font-medium">
                Location: {form.address}, {form.city}, {form.country}
              </p>
              <h2 className="mt-4 mb-2">amenities</h2>
              <MetaIcons meta={form.meta} size={32} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

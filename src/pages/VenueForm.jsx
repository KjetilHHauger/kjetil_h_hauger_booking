import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useUserStore from "../stores/userStore";
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

export default function VenueForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { user } = useUserStore();
  const BASE_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

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
  const [activeTab, setActiveTab] = useState("details");
  const [showPreview, setShowPreview] = useState(false);

  // load existing data
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/holidaze/venues/${id}?_owner=true`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "X-Noroff-API-Key": API_KEY,
            },
          }
        );
        if (!res.ok) throw new Error();
        const { data } = await res.json();
        setForm({
          title: data.name,
          description: data.description,
          imageUrl: data.media?.[0]?.url || "",
          price: data.price,
          maxGuests: data.maxGuests,
          address: data.location.address,
          city: data.location.city,
          country: data.location.country,
          rating: data.rating || "",
          meta: data.meta || form.meta,
        });
      } catch {
        toast.error("Failed to load venue");
      }
    })();
  }, [id]);

  const buildHeaders = () => {
    const h = {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
    };
    if (user?.accessToken) h.Authorization = `Bearer ${user.accessToken}`;
    return h;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.title,
      description: form.description,
      media: [{ url: form.imageUrl, alt: form.title }],
      price: Number(form.price),
      maxGuests: parseInt(form.maxGuests, 10),
      location: {
        address: form.address,
        city: form.city,
        country: form.country,
      },
      meta: form.meta,
    };
    if (form.rating) payload.rating = Number(form.rating);

    try {
      const url = isEdit
        ? `${BASE_URL}/holidaze/venues/${id}`
        : `${BASE_URL}/holidaze/venues`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: buildHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { data } = await res.json();
      toast.success(isEdit ? "Venue updated!" : "Venue created!");
      navigate(`/venue/${data.id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this venue?")) return;
    try {
      const res = await fetch(`${BASE_URL}/holidaze/venues/${id}`, {
        method: "DELETE",
        headers: buildHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success("Venue deleted");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const tabs = [
    { id: "details", label: "Details" },
    { id: "location", label: "Location" },
    { id: "amenities", label: "Amenities" },
    { id: "media", label: "Media" },
  ];

  const placeholder =
    "Tell us about your venue! What makes it special? What can guests expect?";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-heading-4 font-bold mb-6">
        {isEdit ? "Edit Venue" : "Create Venue"}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* FORM */}
        <form
          id="venue-form"
          onSubmit={handleSubmit}
          className={`space-y-6 md:w-1/2 ${
            showPreview ? "hidden md:block" : ""
          }`}
        >
          {/* Tabs */}
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

          {/* Details Tab */}
          {activeTab === "details" && (
            <>
              <div>
                <label className="block mb-1">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
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
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
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
                  onChange={(e) =>
                    setForm({ ...form, maxGuests: e.target.value })
                  }
                  required
                  className="border p-2 rounded w-full"
                />
              </div>
            </>
          )}

          {/* Location Tab */}
          {activeTab === "location" && (
            <>
              <div>
                <label className="block mb-1">Address *</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  required
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">City *</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1">Country *</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                  required
                  className="border p-2 rounded w-full"
                />
              </div>
            </>
          )}

          {/* Amenities Tab */}
          {activeTab === "amenities" && (
            <>
              <div>
                <label className="block mb-1">Rating (0–5)</label>
                <input
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
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
                        checked={form.meta[key]}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            meta: { ...form.meta, [key]: e.target.checked },
                          })
                        }
                        className="form-checkbox"
                      />
                      <Icon size={24} weight="bold" title={label} />
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div>
              <label className="block mb-1">Image URL *</label>
              <input
                name="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                required
                className="border p-2 rounded w-full"
              />
            </div>
          )}

          {/* Mobile Preview Toggle */}
          {!showPreview && (
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="w-full md:hidden px-4 py-2 bg-cta text-white rounded"
            >
              Preview
            </button>
          )}

          {/* Submit & Delete Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-cta text-white py-2 rounded"
            >
              {isEdit ? "Save Changes" : "Create Venue"}
            </button>
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Delete
              </button>
            )}
          </div>
        </form>

        {/* PREVIEW */}
        <div
          className={`${
            showPreview ? "block" : "hidden"
          } md:block md:w-1/2 p-4 border rounded`}
          aria-label="Preview"
        >
          <h2 className="text-heading-3 font-bold mb-4">
            {form.title || "Venue Title"}
          </h2>
          <VenueGallery
            media={
              form.imageUrl
                ? [{ url: form.imageUrl, alt: form.title }]
                : [{ url: "https://placehold.co/600x400", alt: "Placeholder" }]
            }
          />
          <div className="mt-4 space-y-2">
            <p>{form.description || placeholder}</p>
            <p>
              <strong>Price:</strong> {form.price || "0"} / night
            </p>
            <p>
              <strong>Max Guests:</strong> {form.maxGuests || "0"}
            </p>
            <p>
              <strong>Location:</strong> {form.address}, {form.city},{" "}
              {form.country}
            </p>
            <h3 className="mt-4 mb-2">Amenities</h3>
            <MetaIcons meta={form.meta} size={32} />
          </div>

          {showPreview && (
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className="mt-4 w-full md:hidden px-4 py-2 bg-cta text-white rounded"
            >
              Back to Form
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

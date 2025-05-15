import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useUserStore from "../stores/userStore";
import MetaIcons from "../components/MetaIcons";
import VenueGallery from "../components/VenueGallery";
import DetailsTab from "../components/venueForm/DetailsTab";
import AmenitiesTab from "../components/venueForm/AmenitiesTab";
import LocationTab from "../components/venueForm/LocationTab";
import MediaTab from "../components/venueForm/MediaTab";

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
    price: "",
    maxGuests: "",
    address: "",
    city: "",
    country: "",
    rating: "",
    meta: { wifi: false, parking: false, pets: false, breakfast: false },
    mediaUrls: [""],
  });

  const [activeTab, setActiveTab] = useState("details");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!isEdit || !user?.accessToken) return;
    (async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/holidaze/venues/${id}?_owner=true&_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "X-Noroff-API-Key": API_KEY,
            },
          }
        );
        if (!res.ok) throw new Error();
        const { data } = await res.json();
        setForm((f) => ({
          ...f,
          title: data.name,
          description: data.description,
          price: data.price,
          maxGuests: data.maxGuests,
          address: data.location.address,
          city: data.location.city,
          country: data.location.country,
          rating: data.rating || "",
          meta: data.meta || f.meta,
          mediaUrls: (data.media?.map((m) => m.url) || [""]).slice(0, 8),
        }));
      } catch {
        toast.error("Failed to load venue");
      }
    })();
  }, [id, user?.accessToken, API_KEY, BASE_URL, isEdit]);

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
      media: form.mediaUrls
        .filter((u) => u.trim() !== "")
        .slice(0, 8)
        .map((url) => ({ url, alt: form.title })),
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

  const addMediaField = () => {
    setForm((f) => ({
      ...f,
      mediaUrls: f.mediaUrls.length < 8 ? [...f.mediaUrls, ""] : f.mediaUrls,
    }));
  };

  const removeMediaField = (idx) => {
    setForm((f) => {
      const arr = [...f.mediaUrls];
      arr.splice(idx, 1);
      return { ...f, mediaUrls: arr };
    });
  };

  const updateMediaUrl = (idx, value) => {
    setForm((f) => {
      const arr = [...f.mediaUrls];
      arr[idx] = value;
      return { ...f, mediaUrls: arr };
    });
  };

  const tabs = [
    { id: "details", label: "Details" },
    { id: "location", label: "Location" },
    { id: "amenities", label: "Amenities" },
    { id: "media", label: "Media" },
  ];

  const previewMedia = form.mediaUrls
    .filter((u) => u.trim() !== "")
    .slice(0, 8)
    .map((url) => ({ url, alt: form.title }));

  const handleFieldChange = (field, value) =>
    setForm((f) => ({ ...f, [field]: value }));

  const placeholder =
    "Tell us about your venue! What makes it special? What can guests expect?";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-heading-4 font-bold mb-6">
        {isEdit ? "Edit Venue" : "Create Venue"}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <form
          id="venue-form"
          onSubmit={handleSubmit}
          autoComplete="off"
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
                className={`flex-1 py-2 text-center font-bold ${
                  activeTab === id
                    ? "border-b-2 border-cta font-bold"
                    : "text-gray-600 cursor-pointer hover:text-cta-icon-hover"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activeTab === "details" && (
            <DetailsTab form={form} onChange={handleFieldChange} />
          )}

          {activeTab === "location" && (
            <LocationTab
              form={form}
              onChange={(field, value) =>
                setForm((f) => ({ ...f, [field]: value }))
              }
            />
          )}

          {activeTab === "amenities" && (
            <AmenitiesTab
              meta={form.meta}
              onChange={(newMeta) => setForm((f) => ({ ...f, meta: newMeta }))}
            />
          )}

          {activeTab === "media" && (
            <MediaTab
              mediaUrls={form.mediaUrls}
              onAddField={addMediaField}
              onRemoveField={removeMediaField}
              onUpdateField={updateMediaUrl}
            />
          )}

          {!showPreview && (
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="w-full md:hidden px-4 py-2 bg-cta hover:bg-cta-icon-hover text-white rounded cursor-pointer"
            >
              Preview
            </button>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-cta hover:bg-cta-icon-hover text-white py-2 rounded cursor-pointer"
            >
              {isEdit ? "Save Changes" : "Create Venue"}
            </button>
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-state-error hover:bg-state-error-hover text-white py-2 rounded cursor-pointer"
                aria-label="Delete Venue"
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

          {previewMedia.length > 0 && <VenueGallery media={previewMedia} />}

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
              className="mt-4 w-full md:hidden px-4 py-2 bg-cta text-white rounded cursor-pointer"
            >
              Back to Form
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

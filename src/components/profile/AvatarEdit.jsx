import { useState } from "react";
import { Pencil } from "@phosphor-icons/react";

export default function AvatarEdit({ avatar, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState(avatar.url);
  const [alt, setAlt] = useState(avatar.alt);

  if (!isEditing) {
    return (
      <div className="relative mb-4 flex flex-col items-center md:items-start">
        <div className=" max-w-52 w-44 h-44 border rounded-full overflow-hidden">
          <img src={url} alt={alt} className="w-full h-full object-cover" />
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="absolute bottom-1 left-1/2 transform translate-x-[-50%] translate-y-[50%] md:left-1 mt-2 inline-flex items-center justify-center bg-white p-1 rounded-full shadow cursor-pointer"
          aria-label="Edit avatar"
        >
          <Pencil size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="mb-4 space-y-2 w-44">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <div className="flex justify-between gap-2">
        <button onClick={() => setIsEditing(false)} className="btn-outline">
          Cancel
        </button>
        <button
          onClick={() => {
            onSave({ url, alt });
            setIsEditing(false);
          }}
          className="btn-primary"
        >
          Save
        </button>
      </div>
    </div>
  );
}

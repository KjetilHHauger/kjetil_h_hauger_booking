import { Plus } from "@phosphor-icons/react";

export default function MediaTab({
  mediaUrls,
  onAddField,
  onRemoveField,
  onUpdateField,
}) {
  return (
    <div>
      <h2 className="block mb-1">Image URLs (max 8)</h2>
      <div className="space-y-2">
        {mediaUrls.map((url, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              aria-label="Image URL"
              type="url"
              value={url}
              placeholder="Image URL"
              onChange={(e) => onUpdateField(idx, e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => onRemoveField(idx)}
              className="text-state-error hover:text-state-error-hover cursor-pointer font-bold"
              title="Remove this image"
            >
              X
            </button>
          </div>
        ))}

        {mediaUrls.length < 8 && (
          <button
            type="button"
            onClick={onAddField}
            className="flex items-center gap-1 text-brand-primary hover:underline"
          >
            <Plus size={20} /> Add photo
          </button>
        )}
      </div>
    </div>
  );
}

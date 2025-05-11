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

export default function AmenitiesTab({ meta, onChange }) {
  return (
    <div>
      <label className="block mb-1">Amenities</label>
      <div className="flex gap-4">
        {metaConfig.map(({ icon: Icon, key, label }) => (
          <label key={key} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={meta[key]}
              onChange={(e) => onChange({ ...meta, [key]: e.target.checked })}
              className="form-checkbox"
            />
            <Icon size={24} weight="bold" title={label} />
          </label>
        ))}
      </div>
    </div>
  );
}

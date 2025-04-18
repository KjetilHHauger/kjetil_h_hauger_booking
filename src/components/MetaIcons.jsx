import {
  WifiHigh,
  PawPrint,
  ForkKnife,
  LetterCircleP,
} from "@phosphor-icons/react";

const metaConfig = [
  { icon: WifiHigh, key: "wifi", label: "Wi-Fi" },
  { icon: LetterCircleP, key: "parking", label: "Parking" },
  { icon: PawPrint, key: "pets", label: "Pets" },
  { icon: ForkKnife, key: "breakfast", label: "Breakfast" },
];

export default function MetaIcons({ meta, size = 24 }) {
  return (
    <div className="flex gap-4 mb-6">
      {metaConfig.map(({ icon: Icon, key, label }) => (
        <div key={key} className="relative text-cta">
          <Icon
            size={size}
            weight="bold"
            className={`${!meta[key] ? "opacity-30" : ""}`}
            title={`${label} ${meta[key] ? "available" : "not available"}`}
          />
          {!meta[key] && (
            <div className="absolute top-3 right-1 w-8 h-5 border-t-4 border-state-error rotate-45 pointer-events-none" />
          )}
        </div>
      ))}
    </div>
  );
}

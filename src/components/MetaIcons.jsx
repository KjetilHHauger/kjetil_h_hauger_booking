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

export default function MetaIcons({ meta }) {
  return (
    <div className="flex gap-2 mb-4">
      {metaConfig.map(({ icon: Icon, key, label }) => (
        <div key={key} className="relative w-6 h-6 text-cta">
          <Icon
            size={24}
            weight="bold"
            className={`${!meta[key] ? "opacity-30" : ""}`}
            title={`${label} ${meta[key] ? "available" : "not available"}`}
          />
          {!meta[key] && (
            <div className="absolute top-2 right-2 w-5 h-5 border-t-4 border-state-error rotate-45 pointer-events-none" />
          )}
        </div>
      ))}
    </div>
  );
}

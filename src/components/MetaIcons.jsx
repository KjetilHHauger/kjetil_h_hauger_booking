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
            <div
              className="absolute pointer-events-none rotate-45 border-t-4 border-state-error"
              style={{
                top: size * 0.4,
                right: size * 0.1,
                width: size * 0.9,
                height: size * 0.2,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

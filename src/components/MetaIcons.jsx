import wifiIcon from "../assets/icons/wifi-high.svg";
import petsIcon from "../assets/icons/dog.svg";
import breakfastIcon from "../assets/icons/fork-knife.svg";
import parkingIcon from "../assets/icons/letter-circle-p.svg";

const metaConfig = [
  { icon: wifiIcon, key: "wifi", label: "Wi-Fi" },
  { icon: parkingIcon, key: "parking", label: "Parking" },
  { icon: petsIcon, key: "pets", label: "Pets" },
  { icon: breakfastIcon, key: "breakfast", label: "Breakfast" },
];

export default function MetaIcons({ meta }) {
  return (
    <div className="flex gap-2 mb-4">
      {metaConfig.map(({ icon, key, label }) => (
        <div key={key} className="relative w-5 h-5">
          <img
            src={icon}
            alt={`${label} ${meta[key] ? "available" : "not available"}`}
            className="w-full h-full"
          />
          {!meta[key] && (
            <div className="absolute top-[6px] left-[-7px] w-full h-full border-t-4 border-state-error rotate-45"></div>
          )}
        </div>
      ))}
    </div>
  );
}

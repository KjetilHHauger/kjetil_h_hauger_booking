import { useState } from "react";
import searchIcon from "../assets/icons/magnifying-glass.svg";

export default function locationSearch({ onChange }) {
  const [location, setLocation] = useState("");

  const locationInput = (e) => {
    const value = e.target.value;
    setLocation(value);
    onChange?.(value);
  };

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded shadow bg-white">
      <img src={searchIcon} alt="Location Icon" className="w-5 h-5" />
      <input
        type="text"
        value={location}
        onChange={locationInput}
        placeholder="Where do you want to go?"
        className="w-full outline-none bg-transparent placeholder-gray-500 text-body-xs"
      />
    </div>
  );
}

import { useState } from "react";
import CaretDown from "../assets/icons/caret-down.svg";
import CaretUp from "../assets/icons/caret-up.svg";

export default function FilterAside({ filters, setFilters, options }) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div>
      <div className="md:hidden mt-6">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex justify-between items-center gap-2 text-sm font-medium bg-brand-secondary text-white px-4 py-2 rounded w-full"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
          <img
            src={showFilters ? CaretUp : CaretDown}
            alt="Toggle Filters"
            className="w-4 h-4"
          />
        </button>
      </div>

      <div
        className={`${showFilters ? "block" : "hidden"} md:block mt-4 md:mt-0`}
      >
        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {options.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters[key]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      [key]: e.target.checked,
                    }))
                  }
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
              }
              className="p-2 border rounded"
            >
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>

            <select
              value={filters.sortOrder}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, sortOrder: e.target.value }))
              }
              className="p-2 border rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  );
}

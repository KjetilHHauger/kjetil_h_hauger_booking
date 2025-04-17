export default function FilterAside({ filters, setFilters, options }) {
  return (
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
          <option value="price">Sort by price</option>
          <option value="rating">Sort by rating</option>
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
  );
}

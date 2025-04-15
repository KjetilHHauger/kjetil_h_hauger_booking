export default function Filter({ filters, setFilters, options }) {
  return (
    <section className="md:mt-60 flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {options.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters[key]}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, [key]: e.target.checked }))
              }
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <section className="flex flex-col gap-4 w-full">
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
          }
          className="p-2 border rounded "
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
      </section>
    </section>
  );
}

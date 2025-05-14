export default function FilterAside({ filters, setFilters, options }) {
  return (
    <section className="flex flex-col gap-4 max-w-44">
      <div className="flex flex-col flex-wrap gap-2">
        {options.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2">
            <input
              name={label}
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
          aria-label="Sort listings"
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split("-");
            setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
          }}
          className="p-2 border rounded"
        >
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating-asc">Rating: low to high</option>
          <option value="rating-desc">Rating: high to low</option>
        </select>
      </div>
    </section>
  );
}

import { useState } from "react";

export default function ProductSearch({ categories, onSearch }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [supermarket, setSupermarket] = useState("");

  const handleSearch2 = () => {
    if (onSearch) {
      onSearch({ query, category, supermarket });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4 rounded-4">
            <h2 className="text-center mb-4 fw-bold">Product Search</h2>

            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg rounded-3"
                placeholder="Search product name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <select
                className="form-select form-select-lg rounded-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Product Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg rounded-3"
                placeholder="Enter supermarket..."
                value={supermarket}
                onChange={(e) => setSupermarket(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary w-100 py-2 rounded-3 fw-semibold"
              onClick={handleSearch2}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

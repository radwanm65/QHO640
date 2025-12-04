import { useState, useEffect } from "react";

import ProductSearch from "./productSearch.jsx";
import TestOrder from "./testOrders.jsx";
import LoginTest from "./testLogin.jsx";
import TestAdminAddProduct from "./testAdminProduct.jsx";
import MapWithMarkers from "./mapWithMarkers.jsx";

function App() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [mockProducts, setMockProducts] = useState([]);
  const [supermarkets, setSupermarkets] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    fetch("/categories")
      .then((res) => res.json())
      .then((data) => setCategoriesList(data));
  }, []);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => setMockProducts(data));
  }, []);

  useEffect(() => {
    fetch("/supermarkets")
      .then((res) => res.json())
      .then((data) => setSupermarkets(data));
  }, []);

  const handleSearch = ({ query, category, supermarket }) => {
    const result = mockProducts.filter((p) => {
      return (
        (!query || p.name.toLowerCase().includes(query.toLowerCase())) &&
        (!category ||
          categoriesList[p.category_id - 1].toLowerCase() ===
            category.toLowerCase()) &&
        (!supermarket ||
          supermarkets[p.supermarket_id - 1]
            .toLowerCase()
            .includes(supermarket.toLowerCase()))
      );
    });
    setFilteredProducts(result);
  };

  return (
    <>
      <h1 className="text-center mt-4 mb-3">QHO-640 CWA Online Demo APP</h1>
      <h2 className="text-center mt-4 mb-3">Assessment Support</h2>

      <ProductSearch categories={categoriesList} onSearch={handleSearch} />
      <h4 className="mt-5">Search Results:</h4>
      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="list-group">
          {filteredProducts.map((p) => (
            <li key={p.product_id} className="list-group-item">
              {p.name} - {p.price} - {p.nutrition} - {p.expiry_date} -
              {p.quantity}-{categoriesList[p.category_id - 1]} -
              {supermarkets[p.supermarket_id - 1]}
            </li>
          ))}
        </ul>
      )}

      <LoginTest />
      <TestOrder />
      <TestAdminAddProduct
        supermarkets={supermarkets}
        categories={categoriesList}
      />
      <MapWithMarkers />
    </>
  );
}

export default App;

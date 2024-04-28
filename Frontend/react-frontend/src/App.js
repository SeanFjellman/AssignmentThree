import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Frontend from './frontend';  // Import your component for adding products
import ProductDisplay from './ProductDisplay';  // Import your component for displaying products
import Delete  from  './DeleteProduct';
import Update from './UpdateProductPrice';
import Info from './StudentInformation';


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">My App</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/add-product">Add Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-products">View Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/delete-products">Reomve Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/update-products">Update Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Authors">Authors</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ProductDisplay />} />
        <Route path="/add-product" element={<Frontend />} />
        <Route path="/view-products" element={<ProductDisplay />} />
        <Route path="/delete-products" element={<Delete />} />
        <Route path="/update-products" element={<Update />} />
        <Route path="/Authors" element={<Info />} />

      </Routes>
    </Router>
  );
}

export default App;

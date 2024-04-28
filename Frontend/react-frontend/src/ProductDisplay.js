import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/steamStore');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/${id}`);
      setSingleProduct(response.data);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
    }
  };

  const handleIdSubmit = (event) => {
    event.preventDefault();
    fetchProductById(productId);
  };

  const handleViewAll = () => {
    setSingleProduct(null); // Resets the view to show all products
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">View Products</h1>
      <form onSubmit={handleIdSubmit} className="mb-4">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter Product ID to Search" value={productId} onChange={e => setProductId(e.target.value)} />
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
        </div>
      </form>
      {singleProduct ? (
        <div>
          <div className="card mb-3">
            <div className="card-body">
              <p className="card-title">{singleProduct.title} (ID: {singleProduct.id})</p>
              <p className="card-text">{singleProduct.description}</p>
              <p className="card-text">Price: ${singleProduct.price}</p>
              <img src={singleProduct.image} alt={singleProduct.title} className="img-fluid" />
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleViewAll}>View All Products</button>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map(product => (
            <div className="col" key={product.id}>
              <div className="card h-100">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title} (ID: {product.id})</h5>
                  <p className="card-text">{product.description}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Price: ${product.price}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;

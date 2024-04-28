import React, { useState } from 'react';
import axios from 'axios';

const DeleteProduct = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fetchProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/${productId}`);
      setProduct(response.data);
      setConfirmDelete(false); // Reset delete confirmation when new product is fetched
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to fetch product. Please check the console for more details.');
      setProduct(null);
    }
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8081/steamStore/${productId}`);
        alert('Product deleted successfully!');
        setProduct(null);
        setProductId('');
        setConfirmDelete(false);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product. Please check the console for more details.');
      }
    } else {
      // Ask for confirmation again
      setConfirmDelete(true);
    }
  };

  return (
    <div className="container">
      <h1>Delete Product</h1>
      <div>
        <input
          type="text"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          placeholder="Enter Product ID"
        />
        <button onClick={fetchProductById}>Fetch Product</button>
      </div>
      {product && (
        <div>
          <h2>Confirm Product Details</h2>
          <p>Title: {product.title}</p>
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <img src={product.image} alt={product.title} style={{ width: '100px' }} />
          {confirmDelete ? (
            <div>
              <p>Are you sure you want to delete this product? This action cannot be undone.</p>
              <button onClick={handleDelete}>Confirm Delete</button>
            </div>
          ) : (
            <button onClick={handleDelete}>Delete Product</button>
          )}
        </div>
      )}
    </div>
  );
};

export default DeleteProduct;

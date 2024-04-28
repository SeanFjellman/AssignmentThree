import React, { useState } from 'react';
import axios from 'axios';

const UpdateProductPrice = () => {
  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  const fetchProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to fetch product. Please check the console for more details.');
    }
  };

  const handlePriceUpdate = async () => {
    if (newPrice && product) {
      try {
        const updatedProduct = { ...product, price: newPrice };
        // Ensure _id is not sent to the backend
        delete updatedProduct._id;
  
        const response = await axios.put(`http://localhost:8081/steamStore/${productId}`, updatedProduct);
        alert('Product price updated successfully!');
        setProduct({...product, price: newPrice});  // Update the local state to reflect the new price
      } catch (error) {
        console.error('Error updating product price:', error);
        alert('Failed to update product price. Please check the console for more details.');
      }
    } else {
      alert('Please enter a valid new price.');
    }
  };
  

  return (
    <div className="container">
      <h1>Update Product Price</h1>
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
          <h2>Confirm Product Details Before Updating Price</h2>
          <p>Title: {product.title}</p>
          <p>Description: {product.description}</p>
          <p>Current Price: ${product.price}</p>
          <input
            type="number"
            value={newPrice}
            onChange={e => setNewPrice(e.target.value)}
            placeholder="Enter New Price"
          />
          <button onClick={handlePriceUpdate}>Update Price</button>
        </div>
      )}
    </div>
  );
};

export default UpdateProductPrice;

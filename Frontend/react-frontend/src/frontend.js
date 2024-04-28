import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Frontend = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
    rating: { rate: '', count: '' }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/steamStore');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "rate" || name === "count") {
      setNewProduct(prev => ({
        ...prev,
        rating: { ...prev.rating, [name]: value }
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const productToSend = {
        ...newProduct,
        id: parseInt(newProduct.id, 10),
        price: parseFloat(newProduct.price),
        rating: {
          rate: parseFloat(newProduct.rating.rate),
          count: parseInt(newProduct.rating.count, 10)
        }
      };

      await axios.post('http://localhost:8081/steamStore', productToSend);
      setNewProduct({
        id: '', 
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        rating: { rate: '', count: '' }
      });
      fetchData();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Product Catalog</h1>
      <div className="mb-5">
        <h2>Add a Product</h2>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label htmlFor="id" className="form-label">ID</label>
            <input type="text" className="form-control" id="id" name="id" value={newProduct.id} onChange={handleInputChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={newProduct.title} onChange={handleInputChange} />
          </div>
          <div className="col-12">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" className="form-control" id="price" name="price" value={newProduct.price} onChange={handleInputChange} />
          </div>
          <div className="col-12">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={newProduct.description} onChange={handleInputChange} />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">Category</label>
            <input type="text" className="form-control" id="category" name="category" value={newProduct.category} onChange={handleInputChange} />
          </div>
          <div className="col-12">
            <label htmlFor="image" className="form-label">Image URL</label>
            <input type="text" className="form-control" id="image" name="image" value={newProduct.image} onChange={handleInputChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="rate" className="form-label">Rating Rate</label>
            <input type="text" className="form-control" id="rate" name="rate" value={newProduct.rating.rate} onChange={handleInputChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="count" className="form-label">Rating Count</label>
            <input type="text" className="form-control" id="count" name="count" value={newProduct.rating.count} onChange={handleInputChange} />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        </form>
      </div>
      <div>
        {products.map(product => (
          <div key={product.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">Price: ${product.price}</p>
              <p className="card-text">Description: {product.description}</p>
              <p className="card-text">Category: {product.category}</p>
              <img src={product.image} alt={product.title} className="img-fluid" />
              {product.rating && <p className="card-text">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frontend;

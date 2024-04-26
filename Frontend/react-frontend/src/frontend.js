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
    image: ''
  });
  const [deleteId, setDeleteId] = useState(''); // State to hold the ID of the product to delete

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
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Ensure id is an integer and price is a double
      const productToSend = {
        ...newProduct,
        id: parseInt(newProduct.id, 10),
        price: parseFloat(newProduct.price)
      };
  
      await axios.post('http://localhost:8081/steamStore', productToSend);
      setNewProduct({
        id: '', 
        title: '',
        price: '',
        description: '',
        category: '',
        image: ''
      }); // Reset form after submission
      fetchData(); // Refresh the product list after adding a new product
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8081/steamStore/${deleteId}`);
      setDeleteId(''); // Reset delete ID after deletion
      fetchData(); // Refresh the product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product Catalog</h1>
      <div>
        <h2>Add a Game</h2>
        <form onSubmit={handleSubmit}>
          <label>ID:<input type="text" name="id" value={newProduct.id} onChange={handleInputChange} /></label>
          <label>Title:<input type="text" name="title" value={newProduct.title} onChange={handleInputChange} /></label>
          <label>Price:<input type="text" name="price" value={newProduct.price} onChange={handleInputChange} /></label>
          <label>Description:<input type="text" name="description" value={newProduct.description} onChange={handleInputChange} /></label>
          <label>Category:<input type="text" name="category" value={newProduct.category} onChange={handleInputChange} /></label>
          <label>Image URL:<input type="text" name="image" value={newProduct.image} onChange={handleInputChange} /></label>
          <button type="submit">Add Game</button>
        </form>
      </div>
      <div>
        <h2>Delete a Game</h2>
        <input
          type="text"
          value={deleteId}
          onChange={e => setDeleteId(e.target.value)}
          placeholder="Enter ID to delete"
        />
        <button onClick={handleDelete}>Delete Game</button>
      </div>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Category: {product.category}</p>
            <img src={product.image} alt={product.title} />
            {product.rating && <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frontend;

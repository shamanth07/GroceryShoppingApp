import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const AddProductForm = ({ category, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [id, setId] = useState('');
  
  useEffect(() => {
    const fetchProductCount = async () => {
      const productsRef = collection(db, category);
      const productsSnapshot = await getDocs(productsRef);
      const productsCount = productsSnapshot.size;
      let offset;
      switch (category) {
        case 'fruits':
          offset = 101;
          break;
        case 'vegetables':
          offset = 201;
          break;
        case 'flowers':
          offset = 301;
          break;
        case 'snacks':
          offset = 401;
          break;
        default:
          offset = 0;
          break;
      }
      setId(productsCount + offset);
    };
    fetchProductCount();
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, category), {
        id: id.toString(),
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
        image: '/images/default.jpg'
      });
      alert(name + '   added successfully')
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
  <div className="form-row">
    <label htmlFor="name">Name:</label>
    <input
      id="name"
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>
  <div className="form-row">
    <label htmlFor="category">Category:</label>
    <input
      id="category"
      type="text"
      value={category}
      readOnly
    />
  </div>
  <div className="form-row">
    <label htmlFor="description">Description:</label>
    <input
      id="description"
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
    />
  </div>
  <div className="form-row">
    <label htmlFor="price">Price:</label>
    <input
      id="price"
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      required
    />
  </div>
  <div className="form-row">
    <label htmlFor="quantity">Quantity:</label>
    <input
      id="quantity"
      type="number"
      value={quantity}
      onChange={(e) => setQuantity(e.target.value)}
      required
    />
  </div>
  <div className="form-buttons">
    <button type="submit">Add Product</button>
    <button type="button" onClick={onClose}>Cancel</button>
  </div>
</form>

  );
};

export default AddProductForm;


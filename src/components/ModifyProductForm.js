import React, { useState, useEffect } from 'react';
import { db, realtimedb } from '../firebase';
import { ref, get, update } from 'firebase/database';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import '../css/ModifyProductForm.css';

const ModifyProductForm = ({ category, productId, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    // const fetchProductDetails = async () => {
    //     try {
    //         const docRef = doc(db, category, productId);
    //         const docSnap = await getDoc(docRef);
    //         if (docSnap.exists()) {
    //           const productData = docSnap.data();
    //           setName(productData.name);
    //           setDescription(productData.description);
    //           setPrice(productData.price);
    //           setQuantity(productData.quantity);
    //           setImage(productData.image);
    //         }
    //     } catch (error) {
    //       console.error('Error fetching products:', error);
    //     }
    //   };

    const fetchProductDetails = async () => {
      try {
        const productRef = ref(realtimedb, `${category}/${productId}`);
        const snapshot = await get(productRef);

        if (snapshot.exists()) {
          const productData = snapshot.val();
          setName(productData.name);
          setDescription(productData.description);
          setPrice(productData.price);
          setQuantity(productData.quantity);
          setImage(productData.image);
        } else {
          console.log('No product data available');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [category, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productRef = ref(realtimedb, `${category}/${productId}`);
      
      await update(productRef, {
        name,
        description,
        price: Number(price),
        quantity: Number(quantity),
        image
      });
      
      alert('Product updated successfully');
      onClose();
    } 
    catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modify-product-form">
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
        <button type="submit">Update Product</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
};

export default ModifyProductForm;

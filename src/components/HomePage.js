import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import '../css/HomePage.css';

const HomePage = () => {
  const [category, setCategory] = useState('fruits');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, category);
        const productsSnapshot = await getDocs(productsRef);
        const productsList = [];
        productsSnapshot.docs.forEach(doc => {
          productsList.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setProducts(productsList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(product.name + ' added to cart successfully');
  };
  const updateQuantity = (productId, amount) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity += amount;
      if (item.quantity <= 0) {
        setCart(cart.filter(i => i.id !== productId));
      } else {
        setCart([...cart]);
      }
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  
  return (
    <div className="home">
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} - {item.quantity}
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              <button onClick={() => updateQuantity(item.id, -1)}>-</button>
              <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <h3>Total Price: ${getTotalPrice()}</h3>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default HomePage;

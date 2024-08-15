import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { db, realtimedb } from '../firebase';
import { auth } from '../firebase';
import { ref, get } from 'firebase/database';
import { signOut } from 'firebase/auth';
import '../css/HomePage.css';

const HomePage = () => {
  const [category, setCategory] = useState('fruits');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user, user_doc_id } = location.state || {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = ref(realtimedb, category);
        const snapshot = await get(productsRef);

        if (snapshot.exists()) {
          const productsData = snapshot.val();
          const productsList = Object.keys(productsData).map((key) => ({
            document_id: key,
            ...productsData[key],
          }));
          setProducts(productsList);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(product.name + ' added to cart successfully');
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    if (showCart) {
      setShowCart(!showCart);
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const updateQuantity = (productId, amount) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      item.quantity += amount;
      if (item.quantity <= 0) {
        setCart(cart.filter((i) => i.id !== productId));
      } else {
        setCart([...cart]);
      }
    }
  };

  const deleteFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      alert('Order has been placed successfully!');
      setShowCart(false);
      setCart([]);
      setCategory('fruits');
    } else {
      alert("Your cart is empty can't checkout");
    }
  };

  return (
    <div className="home-container">
      <NavBar
        toggleCart={toggleCart}
        handleLogout={handleLogout}
        user={user}
        user_doc_id={user_doc_id}
        setCategory={handleCategoryChange}
      />
      <div className="main-content">
        <div className={`content ${category}`}>
          {showCart ? (
            <div className="cart">
              <h2>Cart</h2>
              <ul>
                {cart.map((item) => (
                  <li key={item.id}>
                    <div className="cart-item-name">
                      {item.name} - {item.quantity}
                    </div>
                    <div className="cart-item-buttons">
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        -
                      </button>
                      <button onClick={() => deleteFromCart(item.id)}>
                        Delete
                      </button>
                    </div>
                    <div className="cart-item-price">
                      ${item.price * item.quantity.toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
              <h3>Total Price: ${getTotalPrice()}</h3>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          ) : (
            <>
              <div className="product-list">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

import React, { useState, useEffect } from 'react';
import { db, realtimedb } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, get } from 'firebase/database';
import NavBar from './Navbar';
import Footer from '../components/Footer';
import ProductCard from './ProductCard';
import ModifyProductForm from './ModifyProductForm';
import AddProductForm from './AddProductForm';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../css/AdminHomePage.css';

const AdminHomePage = () => {
  const [category, setCategory] = useState('fruits');
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = ref(realtimedb, category);
        const snapshot = await get(productsRef);

        if (snapshot.exists()) {
          const productsData = snapshot.val();
          const productsList = Object.keys(productsData).map(key => ({
            document_id: key, 
            ...productsData[key]
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

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setShowModal(true);
  };

  const handleModify = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  }

  return (
    <div className="admin-home">
      <NavBar handleLogout={handleLogout} isAdmin={true} setCategory={handleCategoryChange}/>
      <div className="main-content">
        <div className="admin-content">
          <button className="add-product-button" onClick={handleAddProduct}>Add New Product</button>
          <div className="product-list">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                userRole="admin"
                onModify={handleModify}
              />
            ))}
          </div>
          {showModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                {currentProduct ? (
                  <div>
                    <h2>Modify Product</h2>
                    <ModifyProductForm
                      category={category}
                      productId={currentProduct.document_id}
                      onClose={handleModalClose}
                    />
                  </div>
                ) : (
                  <div>
                    <h2>Add Product</h2>
                    <AddProductForm
                      category={category}
                      onClose={handleModalClose}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminHomePage;


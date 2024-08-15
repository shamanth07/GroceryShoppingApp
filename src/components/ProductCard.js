import React from 'react';
import '../css/ProductCard.css';

const ProductCard = ({ product, addToCart, userRole, onModify }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      {userRole === 'admin' ? (
        <button onClick={() => onModify(product)}>Modify</button>
      ) : (
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      )}
    </div>
  );
};

export default ProductCard;


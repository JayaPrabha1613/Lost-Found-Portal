import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addProduct = (product) => {
    setProducts([...products, product]);
  }

  return (
    <div className="app">
      <nav>
        <h2>Lost & Found Portal</h2>
        <ProductForm addProduct={addProduct} />
      </nav>

      {/* Pass setProducts so ProductList can update products */}
      <ProductList products={products} setProducts={setProducts} />
    </div>
  );
}

export default App;

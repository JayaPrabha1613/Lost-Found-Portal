import React, { useState } from 'react';
import axios from 'axios';

function ProductForm({ addProduct }) {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, place, phone, description: desc, image };
    const res = await axios.post('http://localhost:5000/api/products', newProduct);
    addProduct(res.data);

    setName(''); setPlace(''); setPhone(''); setDesc(''); setImage('');
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Place Found" value={place} onChange={e => setPlace(e.target.value)} required />
      <input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
      <input type="file" onChange={handleImage} required />
      <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} required />
      <button type="submit">Upload</button>
    </form>
  );
}

export default ProductForm;

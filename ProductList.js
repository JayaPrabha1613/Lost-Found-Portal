import React, { useState } from 'react';

function ProductList({ products, setProducts }) {
  const [selected, setSelected] = useState(null);

  const toggleGivenStatus = (product) => {
    const updated = { ...product, given: !product.given };
    setProducts(prev => prev.map(p => (p._id === product._id ? updated : p)));
    if (selected && selected._id === product._id) setSelected(updated);
  };

  // Custom order groups
  const productOrder = ['mobile', 'keys', 'jewels', 'accessories', 'makeup', 'bag'];
  const placeOrder = ['madurai', 'chennai', 'coimbatore', 'virudhunagar'];

  // Group products by type
  const groupByType = productOrder.map(type => ({
    type,
    items: products.filter(p => p.name.toLowerCase() === type)
  }));

  // Group products by city
  const groupByPlace = placeOrder.map(city => ({
    city,
    items: products.filter(p => p.place.toLowerCase() === city)
  }));

  // Render cards
  const renderCards = (items) =>
    items.map(p => (
      <div key={p._id} className="product-card">
        <img src={p.image} alt="Product" />
        <h3>{p.name}</h3>
        <p>{p.place}</p>

        {p.given && (
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            Given to Owner
            <button
              style={{ marginLeft: '5px', padding: '2px 5px', cursor: 'pointer' }}
              onClick={() => toggleGivenStatus(p)}
            >
              Give Back
            </button>
          </p>
        )}

        <button onClick={() => setSelected(p)}>View</button>
      </div>
    ));

  return (
    <div className="product-list-container">

      {/* Group by Type */}
      {groupByType.map(group => group.items.length > 0 && (
        <div key={group.type}>
          <h2 style={{ marginTop: '20px' }}>Product Type: {group.type}</h2>
          <div className="product-list">{renderCards(group.items)}</div>
        </div>
      ))}

      {/* Group by City */}
      {groupByPlace.map(group => group.items.length > 0 && (
        <div key={group.city}>
          <h2 style={{ marginTop: '20px' }}>City: {group.city}</h2>
          <div className="product-list">{renderCards(group.items)}</div>
        </div>
      ))}

      {/* Modal */}
      {selected && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelected(null)}>&times;</span>
            <h2>{selected.name}</h2>
            <img src={selected.image} alt="Product" />
            <p><b>Owner:</b> Owner</p>
            <p><b>Phone:</b> {selected.phone}</p>
            <p><b>Place Found:</b> {selected.place}</p>
            <p><b>Description:</b> {selected.description}</p>
            {selected.given && <p style={{ color: 'green', fontWeight: 'bold' }}>Given to Owner</p>}

            <button onClick={() => toggleGivenStatus(selected)}>
              {selected.given ? 'Give Back' : 'Given to Owner'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;

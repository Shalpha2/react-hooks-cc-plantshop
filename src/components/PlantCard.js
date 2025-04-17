import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePrice }) {
  const [inStock, setInStock] = useState(plant.inStock);
  const [price, setPrice] = useState(plant.price);

  function handleToggleStock() {
    setInStock((prev) => !prev);
  }

  function handlePriceSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ price })
    })
      .then((r) => r.json())
      .then(onUpdatePrice);
  }

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE"
    }).then(() => onDeletePlant(plant.id));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <form onSubmit={handlePriceSubmit}>
        <input
          type="number"
          name="price"
          step="0.01"
          readOnly
          value={price}
        />
        <button type="submit">Update Price</button>
      </form>
      <button onClick={handleToggleStock}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
      <button
        onClick={handleDelete}
        style={{ marginTop: "8px", backgroundColor: "red", color: "white" }}
      >
        Delete
      </button>
    </li>
  );
}

export default PlantCard;

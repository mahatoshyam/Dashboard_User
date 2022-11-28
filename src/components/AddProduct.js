import React, { useState } from "react";

export default function AddProduct() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompnay] = React.useState("");
  const [error, setError] = React.useState(false);
  const handleaddproduct = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }
    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem("userdata"));
    const result = fetch("http://localhost:3002/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log("data", result);
    console.log("userdata", userId);
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter product Name"
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        placeholder="Enter product Price "
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}
      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        placeholder="Enter product category"
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setCompnay(e.target.value);
        }}
        placeholder="Enter product campany"
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button onClick={handleaddproduct} className="appButton" type="button">
        Add Products
      </button>
    </div>
  );
}

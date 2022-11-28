import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompnay] = React.useState("");
  const [error, setError] = React.useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("useparams called", params);
    getProductDetails();
  }, []);

  const Updateproducthandler = async () => {
    let result = await fetch(`http://localhost:3002/products/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    console.log("userdata", result);
    navigate("/");
  };

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:3002/products/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log("updatedata", result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompnay(result.company);
  };
  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompnay(e.target.value);
        }}
      />

      <button onClick={Updateproducthandler} className="appButton">
        Update Product
      </button>
    </div>
  );
}

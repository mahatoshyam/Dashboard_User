import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const result = await fetch("http://localhost:3002/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await result.json();
    console.log("data", data);
    setProducts(data);
  };
  const deleteProducthandler = async (id) => {
    let result = await fetch(`http://localhost:3002/products/${id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };
  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3002/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type=""
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.company}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProducthandler(item._id)}>
                Delete
              </button>{" "}
              <button>
                <Link to={"/update/" + item._id}>Update </Link>
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
}

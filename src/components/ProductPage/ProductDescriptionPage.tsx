import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FastServiceContainer from "./FastServiceContainer";
import ZoomImage from "./imagezoom";
import "../../assets/Products/ProductDescriptionPage.css";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  brand?: string;
  inStock: boolean;
  category: string;
  description?: string;
  imageUrl: string;
  isEcoFriendly: boolean;
  onSale: boolean;
  serialNumber: string;
  qualities?: Record<string, string>;
}

const ProductDescriptionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as CartItem; // Access the product details passed from Cart
  const [count, setCount] = useState(1);

  if (!product) {
    return <div className="text-center">Product not found.</div>;
  }

  const addToCart = () => {
    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += count;
    } else {
      cart.push({
        ...product,
        imageUrl: product.imageUrl, // Make sure Cart can read the image
        quantity: count,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addToCartAndNavigate = () => {
    addToCart();
    navigate("/Cart"); // Redirect to the cart after adding the item
  };

  return (
    <div className="container-products container-fluid my-4">
      <div className="container">
        <div className="row d-flex flex-column flex-md-row align-items-center g-4">
          <div className="col-12 col-md-6 text-center main-image">
            <ZoomImage
              src={product.imageUrl || "/fallback-image.png"}
              alt={product.name}
              size="small"
            />
          </div>

          <div className="col-12 col-md-6">
            <div className="description-container text-center text-md-start">
              <h4>{product.name}</h4>
              <p>Item Number: #{product.serialNumber}</p>
              <h3 className="text-primary">${product.price}</h3>

              {product.onSale && (
                <span className="badge bg-warning">On Sale</span>
              )}
              {product.isEcoFriendly && (
                <span className="badge bg-success ms-2">Eco-Friendly</span>
              )}

              <div className="row quantity my-3">
                <div className="col d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => setCount(Math.max(1, count - 1))}
                  >
                    -
                  </button>
                  <span className="h5">{count}</span>
                  <button
                    className="btn btn-outline-secondary ms-2"
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="d-grid">
                <button
                  onClick={addToCartAndNavigate}
                  className="btn add-to-cart-btn btn-success"
                >
                  Add to Cart
                </button>
              </div>

              <div className="description-box mt-4">
                <h4 className="title-description">Description</h4>
                <p>{product.description}</p>

                {product.qualities &&
                  Object.keys(product.qualities).length > 0 && (
                    <div>
                      <h5>Features:</h5>
                      <ul className="list-unstyled">
                        {Object.entries(product.qualities).map(
                          ([key, value], index) => (
                            <li
                              key={index}
                              className="d-flex align-items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                              >
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path
                                  fill="green"
                                  d="M9 19l-7-7 1.41-1.41L9 16.17l11.59-11.59L22 6l-13 13z"
                                />
                              </svg>
                              <span className="ms-2">
                                {key}: {value}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        <FastServiceContainer />
      </div>
    </div>
  );
};

export default ProductDescriptionPage;

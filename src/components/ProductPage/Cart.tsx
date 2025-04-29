import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/Products/Cart.css";
import image from "../../imgAssets/svgs/small-img-holder.png";
import FastServiceContainer from "./FastServiceContainer";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  });

  const totalAmount = cart.reduce((total: number, item: CartItem) => {
    return total + item.price * item.quantity;
  }, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  console.log(cart);
  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item: CartItem) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate("/checkout");
    } else {
      alert("Your cart is empty. Please add at least one product.");
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="container container-cart">
      <div className="mx-auto p-4">
        <h2 className="cart-title mb-4">Cart: {cart.length}</h2>

        {cart.length > 0 ? (
          cart.map((item: CartItem) => (
            <div
              key={item.id}
              className="card p-3 mb-3 shadow-sm rounded-2xl d-flex flex-column flex-md-row align-items-center"
            >
              <div className="d-flex align-items-center w-100 mb-3 mb-md-0">
                <img
                  src={item.imageUrl}
                  alt="product"
                  className="me-3 product-img"
                  style={{ width: "80px", height: "80px" }}
                />
                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-0">Price: ${item.price}</p>
                </div>
              </div>

              <div className="d-flex justify-content-between w-100 mt-3 mt-md-0">
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-primary btn-sub px-2"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button
                    className="btn btn-outline-primary px-2 btn-add"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                <div>
                  <strong>
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </strong>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Your cart is empty.</p>
        )}

        <div className="row total-amount">
          <div className="col-9 text-end fw-bold fs-4">Total:</div>
          <div className="col text-end fw-bold fs-4">
            ${totalAmount.toFixed(2)}
          </div>
        </div>

        <div className="d-flex justify-content-end gap-3 my-4 btn-container">
          <button
            className="btn btn-clearAll btn-outline-primary px-4 py-2"
            onClick={clearCart}
          >
            Clear All
          </button>
          <button
            className="btn btn-checkout btn-primary px-4 py-2"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>

        <FastServiceContainer />
      </div>
    </div>
  );
};

export default Cart;

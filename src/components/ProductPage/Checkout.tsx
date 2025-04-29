import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/Products/CheckoutStyle.css";
import CheckoutInfo from "./CheckoutInfo";

const Checkout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [note, setNote] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // 'delivery' or 'pickup'
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = (): boolean => {
    const personalInfoFilled =
      name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";
    const addressInfoFilled =
      deliveryMethod === "pickup" ||
      (address.trim() !== "" &&
        postalCode.trim() !== "" &&
        city.trim() !== "" &&
        state.trim() !== "");

    return personalInfoFilled && addressInfoFilled;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [name, email, phone, address, postalCode, city, state, deliveryMethod]);

  return (
    <div>
      <div className="container-checkout">
        <h2>Checkout</h2>
        <div className="container-md row mx-auto p-4">
          {/* Billing Info Section */}
          <div className="col-12 col-md-8 billing-info-container">
            <div className="row">
              <h4>Billing Info</h4>
            </div>

            {/* Personal Information */}
            <div className="row">
              <h6>Personal Information</h6>
              <hr />
            </div>
            <div className="row personal-info-form">
              <div className="col-12 col-md-6 mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="p-2 border rounded w-100"
                />
              </div>
              <div className="col-12 col-md-6 mb-4">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="p-2 border rounded w-100"
                />
              </div>
              <div className="col-12 col-md-6 mb-4">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number (+61)"
                  className="p-2 border rounded w-100"
                />
              </div>
            </div>

            {/* Delivery Method */}
            <div className="row mb-4 delivery-Method">
              <h6>Delivery Method</h6>
              <hr />
              <div className="form-check col-6">
                <input
                  className="form-check-input"
                  type="radio"
                  name="deliveryMethod"
                  value="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={() => setDeliveryMethod("delivery")}
                  id="deliveryOption"
                />
                <label className="form-check-label" htmlFor="deliveryOption">
                  Delivery
                </label>
              </div>
              <div className="form-check col-6">
                <input
                  className="form-check-input"
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                  id="pickupOption"
                />
                <label className="form-check-label" htmlFor="pickupOption">
                  Pick-up
                </label>
              </div>
            </div>

            {/* Shipping Address & Delivery Note (Conditional) */}
            {deliveryMethod === "delivery" && (
              <>
                <div className="row">
                  <h6>Shipping Address</h6>
                  <hr />
                </div>
                <div className="row shipping-address">
                  <div className="col-12 col-md-6 mb-4">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address"
                      className="p-2 border rounded w-100"
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-4">
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Postal code"
                      className="p-2 border rounded w-100"
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-4">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="p-2 border rounded w-100"
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-4">
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      className="p-2 border rounded w-100"
                    />
                  </div>
                </div>
              </>
            )}
            {/* Delivery Note */}
            <div className="row delivery-note">
              <h6>Delivery Note</h6>
              <hr />
              <div className="mb-4">
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Note"
                  className="p-2 border rounded w-100"
                />
              </div>
            </div>
          </div>

          {/* Checkout Info Section */}
          <div className="col-12 col-md-4">
            <CheckoutInfo
              isFormValid={isFormValid}
              isDeliveryMethod={deliveryMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

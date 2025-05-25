import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/ServicePage/ServicePageStyle.css";
import service from "../../imgAssets/Service/service.jpg";
import bulkImage from "../../imgAssets/Service/BulkOrders.jpg";
import freePickup from "../../imgAssets/Service/freePickup.jpg";
import nextDelivery from "../../imgAssets/Service/nextDelivery.jpg";

import imag from "../../imgAssets/Categories/bubblewrap.png";
const ServicePage = () => {
  return (
    <div>
      <div className="container-fluid container-service-header">
        <h1> Our service</h1>
        <p>One stop solutions for all your needs </p>
      </div>
      <div className="container what-we-do">
        <div className="row">
          <h1>What We DO</h1>
          <p>
            When it comes to packaging materials, it’s hard to let go of a
            supplier you can trust and rely on. That’s why at Securewarp, we
            provide a wide selection of some of the best products in the supply
            world. We understand our clients like having a variety of products
            to choose from. We proudly carry products such as Stretch film,
            pallet wrap, packaging tapes, and many more.
          </p>
        </div>

        <div className="row service-card">
          <div className="col-12 col-md-4 mb-4">
            {/* Fast delivery */}
            <div
              style={{
                backgroundImage: `url(${nextDelivery})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                minHeight: "300px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "3px 3px rgb(126, 125, 125)",
                height: "100%",
              }}
            >
              <h3>Fast delivery</h3>
              <p>Next-day delivery for your convenience</p>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            {/* Bulk Orders */}
            <div
              style={{
                backgroundImage: `url(${bulkImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                minHeight: "300px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "3px 3px rgb(126, 125, 125)",
                height: "100%",
              }}
            >
              <h3>Free delivery on Bulk Orders</h3>
              <p>
                We offer free deliveries and up to 5% discounts on bulk orders
                Australia-wide.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4 mb-4">
            {/* Free Pickup */}
            <div
              style={{
                backgroundImage: `url(${freePickup})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                minHeight: "300px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "3px 3px rgb(126, 125, 125)",
                height: "100%",
              }}
            >
              <h3>Free pickup</h3>
              <p>Orders get ready within 30 mins</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid why-choose-our-services-container">
        <div className="row align-content-center why-choose-section">
          <div className="col-md-6">
            <img
              src={service}
              alt="Our Aim"
              className="img-fluid w-100 h-auto"
            />
          </div>
          <div className="col-md-6">
            <h2>Why Chooose Our Services</h2>
            <p>
              We service a variety of customers looking for ways to improve
              convenience and efficiency in their operations by supplying a
              range of packaging products.
            </p>
            <div className="experiences">
              <h3>Trust The Experts</h3>
              <p>
                We pride ourselves on our quality products, low prices,
                excellent service, and quick delivery. We service a variety of
                customers looking for ways to improve convenience and efficiency
                in their operations by supplying a range of packaging products.
              </p>
              <h3>Australian born</h3>
              <p>
                We are an Australian family-owned and operated packaging
                supplier for both industrial and personal customers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;

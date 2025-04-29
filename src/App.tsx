import React from "react";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // font awesome icons
import "./assets/HeaderStyle.css"; // Your custom styles
import "./assets/ProductCategories.css";
import Home from "./components/HomePage/Home";
import ProductsPage from "./components/ProductPage/ProductsPage";
import Cart from "./components/ProductPage/Cart";
import ServicePage from "./components/ServicePage/ServicePage";
import Checkout from "./components/ProductPage/Checkout";
import AboutPage from "./components/AboutPage/AboutPage";
import ContactUsPage from "./components/ContactPage/ContactUs";
import Footer from "./components/Footer";
import PoductDescriptionPage from "./components/ProductPage/ProductDescriptionPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Header promtionHeader="Free delivery on order over $500 all over Melbourne" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUsPage />} />

        <Route path="/products/:id" element={<PoductDescriptionPage />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

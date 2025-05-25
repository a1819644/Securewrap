import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styles
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./components/data/ProductContext";
import "./assets/HeaderStyle.css";
import "./assets/ProductCategories.css";

// Lazy loaded components
const Home = lazy(() => import("./components/HomePage/Home"));
const ProductsPage = lazy(
  () => import("./components/ProductPage/ProductsPage")
);
const Cart = lazy(() => import("./components/ProductPage/Cart"));
const Checkout = lazy(() => import("./components/ProductPage/Checkout"));
const ServicePage = lazy(() => import("./components/ServicePage/ServicePage"));
const AboutPage = lazy(() => import("./components/AboutPage/AboutPage"));
const ContactUsPage = lazy(() => import("./components/ContactPage/ContactUs"));
const ProductDescriptionPage = lazy(
  () => import("./components/ProductPage/ProductDescriptionPage")
);

function App() {
  return (
    <Router>
      <Header promtionHeader="Free delivery on order over $500 all over Melbourne" />
      <ProductProvider>
        <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDescriptionPage />} />
            <Route path="/service" element={<ServicePage />} />
            <Route path="/aboutus" element={<AboutPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Suspense>
      </ProductProvider>
      <Footer />
    </Router>
  );
}

export default App;

import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/About/AboutPage.css";
import Diversity from "../../imgAssets/AboutPage/Diversity.png";
import aboutImage from "../../imgAssets/AboutPage/about.jpg";
const AboutPage = () => {
  return (
    <div>
      <div className="container-fluid first-section">
        <div className="row who-we-are align-items-center">
          <div className="col-12 col-md-6 text-section text-center text-md-start p-4">
            <h1>This is Securewrap</h1>
            <p>
              Securewrap is a well-renowned Packaging materials Supplier
              established in 2020. Our company was founded to close the gap
              between industry needs and packaging equipment suppliers. By
              choosing Securewrap, you cut out the middleman and get the
              products you need, right when you need them. We guarantee the best
              customer service from our team of experts and we’ll make sure to
              provide top-quality products at unbeatable prices. Contact us
              today to learn more about what we can do for you.
            </p>
          </div>
          <div className="col-12 col-md-6 photo-section text-center p-4">
            <img
              src={aboutImage}
              alt="About Us"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>

      <div className="container body-section">
        <div className="row customers-employees-australia text-center">
          <div className="col-12 col-sm-4 p-3">
            <h1 style={{ color: "rgb(88, 112, 82)" }}>10,000+ </h1>
            <h5>Customers</h5>
          </div>
          <div className="col-12 col-sm-4 p-3">
            <h1 style={{ color: "rgb(125, 61, 84)" }}>5</h1>
            <h5>Employees</h5>
          </div>
          <div className="col-12 col-sm-4 p-3">
            <h1 style={{ color: "rgb(175, 44, 44)" }}>100% </h1>
            <h5>Australian Born</h5>
          </div>
        </div>
        <div className="row diversity align-items-center text-center text-md-start">
          <div className="col-12 col-md-4 text-center ">
            <img
              src={Diversity}
              alt="Diversity"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-12 col-md-8 ">
            <h3>Everyone is welcome here</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

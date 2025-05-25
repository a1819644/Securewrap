import React from "react";
import ecoFiendlyBanner from "../imgAssets/homePage/ecoFriendly.webp";
import deliveryBanner from "../imgAssets/homePage/delivery.mp4";
export const Carousel = () => {
  return (
    <div className="container-fluid accordion-body">
      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <a href="">
              <img
                src={ecoFiendlyBanner}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
                alt="Eco Friendly"
              />
            </a>
          </div>
          <div className="carousel-item">
            <a href="">
              <video
                className="d-block w-100"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="fallback-image.jpg" // optional fallback image before video loads
              >
                <source src={deliveryBanner} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </a>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

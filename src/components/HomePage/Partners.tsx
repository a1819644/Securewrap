import React from "react";

import "../../assets/PartnerBrand.css";
import lucoLogo from "../../imgAssets/partners/luco.png";
import transcoLogo from "../../imgAssets/partners/transcoCargo.png";
import oaplLogo from "../../imgAssets/partners/oapl.png";
import otterFencingLogo from "../../imgAssets/partners/otterFencing.png";
import opcLogo from "../../imgAssets/partners/opc.png";
import peaceLilyLogo from "../../imgAssets/partners/peaceLife.jpg";
import btkLogisticsLogo from "../../imgAssets/partners/btkLogistics.jpg";
import Slider from "react-slick";

const Partners = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const partners = [
    { logo: lucoLogo, link: "https://www.luco.com.au/" },
    { logo: oaplLogo, link: "https://oapl.com.au/" },
    { logo: transcoLogo, link: "https://www.transcocargo.com.au/" },
    { logo: otterFencingLogo, link: "https://otterfencing.com.au/" },
    { logo: peaceLilyLogo, link: "https://peacelily.com.au/" },
    { logo: opcLogo, link: "https://www.opchealth.com.au/" },
    { logo: btkLogisticsLogo, link: "https://www.btklogistics.com.au/" },
  ];

  return (
    <div className="container accordion-body">
      <div className="row">
        <div className="col">
          <h1>Our Partner Brands</h1>
        </div>
        <div className="partner-brand">
          <div className="slider-container">
            <Slider {...settings}>
              {partners.map((partner, index) => (
                <div key={index} className="partner-slide">
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={partner.logo}
                      alt={`Partner ${index + 1}`}
                      className="partner-logo"
                      width="250"
                      height="150"
                    />
                  </a>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;

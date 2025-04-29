import React from "react";
import "../../assets/Portfolio.css";

import satchelImage from "../../imgAssets/Categories/satchelImage.png";
import stationeryImage from "../../imgAssets/Categories/stationeryImage.png";
import bubblewrapImage from "../../imgAssets/Categories/bubblewrap.png";

export const Portfolio = () => {
  return (
    <div className="container">
      <div className="col">
        <h1>Melbourne's Leading Suppliers</h1>

        {/* First Section */}
        <div className="row portfolio-card">
          <div className="col-md-6">
            <img
              src={stationeryImage}
              className="img-fluid"
              alt="Stationery Supplies"
            />
          </div>
          <div className="col-md-6">
            <p>
              Securewrap is a well-renowned Packaging Materials Supplier
              established in 2020. Our company was founded to close the gap
              between industry needs and packaging equipment suppliers. By
              choosing Securewrap, you cut out the middleman and get the
              products you need, right when you need them.
            </p>
            <p>
              We guarantee the best customer service from our team of experts
              and ensure top-quality products at unbeatable prices. Contact us
              today to learn more about what we can do for you.
            </p>

            <h3>Our Offerings:</h3>
            <ul>
              <li>Pallet wrapping</li>
              <li>A4 adhesive paper</li>
              <li>Packing peanuts</li>
              <li>Zip lock bags</li>
              <li>Padded bubble envelopes</li>
              <li>Masking Tapes</li>
            </ul>
          </div>
        </div>

        {/* Second Section */}
        <div className="row mt-4 second-Section ">
          <div className="col-md-6">
            <h4>Trust the Experts in All Things Packaging</h4>
            <p>
              Using our website, it’s easy to place an order for any supplies
              you require. Our team is committed to processing all orders as
              quickly as possible and can ship products all over the country.
              However, you can also pick up your order directly from our
              Melbourne warehouse to forgo the cost of shipping.
            </p>

            <h4>Why Source Packaging Supplies from Us?</h4>
            <p>
              We are a family-owned business that takes pride in offering high
              quality at competitive prices. Our understanding of clients' needs
              drives us to provide a simple, affordable, and hassle-free
              experience when sourcing packaging supplies in Melbourne, Sydney,
              Brisbane, Perth, Adelaide, and across Australia.
            </p>
            <p>
              Found a competitor with a lower price on an item we stock? Ask us
              about a price match—we’ll happily beat it by 5%! (Terms &
              Conditions apply).
            </p>
          </div>
          <div className="col-md-6">
            <img
              src={bubblewrapImage}
              className="img-fluid"
              alt="Bubble Wrap Packaging"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

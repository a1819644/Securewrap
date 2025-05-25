import React from "react";
import "../../assets/ProductCategoriesCard.css";
import packagingImage from "../../imgAssets/Categories/packing.webp";
import stretchFlimsImage from "../../imgAssets/Categories/stretchFlims.webp";
import satchelImage from "../../imgAssets/Categories/satchelImage.webp";
import stationeryImage from "../../imgAssets/Categories/stationeryImage.webp";
import bubblewrapImage from "../../imgAssets/Categories/bubblewrap.webp";
import { Link } from "react-router-dom";
const categories = [
  {
    name: "Stretch Films",
    image: stretchFlimsImage,
  },
  {
    name: "Mailing Satchels",
    image: satchelImage,
  },
  {
    name: "Packaging",
    image: packagingImage,
  },
  {
    name: "Stationeries",
    image: stationeryImage,
  },
  {
    name: "Bubble Wraps",
    image: bubblewrapImage,
  },
];

const ProductCategoriesCard = () => {
  return (
    <div className="container">
      <div className="row justify-content-center gx-3 gy-2">
        {categories.map((category, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-md-4 col-lg mb-3 d-flex"
          >
            <div className="card h-100 text-center w-100">
              <div className="card-body d-flex flex-column align-items-center">
                <img
                  src={category.image}
                  srcSet={`
                        ${category.image} 150w,
                        ${category.image.replace(".jpg", "-300x300.jpg")} 300w,
                        ${category.image.replace(".jpg", "-600x600.jpg")} 600w,
                        ${category.image.replace(".jpg", "-1500x1500.jpg")} 1500w
                      `}
                  className="card-img-top img-fluid mb-3"
                  alt={category.name}
                />
                <h5 className="card-title">{category.name}</h5>
              </div>
              <Link
                to="/products"
                state={{ category: category.name }}
                className="btn product-categories-card-btn"
              >
                More..
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoriesCard;

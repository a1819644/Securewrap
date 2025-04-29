import React from "react";
import NewArrivalsCard from "./NewArrivalsCard";
const NewArrivals = () => {
  return (
    <div className="container text-center">
      <div className="col">
        <h1>New Arrivals</h1>
        <div className="row product-categories-card g-1">
          <NewArrivalsCard />
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;

import React from "react";
import wallet from "../../imgAssets/svgs/wallet.svg";
import phone from "../../imgAssets/svgs/phone.svg";
import truck from "../../imgAssets/svgs/truck.svg";
import deliverybox from "../../imgAssets/svgs/delivery-box.svg";
import "../../assets/Products/FastServiceContainerStyle.css";
import image from "../../imgAssets/Image.png";
const FastServiceContainer = () => {
  return (
    <div className="row fast-service-container">
      <div className="col mx-auto">
        <p>
          {" "}
          <img src={wallet} alt="" />
          Lowest Prices with top quality
        </p>
        <div className="vertical"></div>
      </div>
      <div className="col  mx-auto">
        <p>
          {" "}
          <img src={phone} alt="" />
          Fast Dispatch in 1 business day
        </p>
        <div className="vertical-2"></div>
      </div>
      <div className="col mx-auto">
        <p>
          {" "}
          <img src={truck} alt="" />
          Instant Support (+61) 452 216 087
        </p>
        <div className="vertical-3"></div>
      </div>
      <div className="col mx-auto">
        <p>
          <img src={deliverybox} alt="" />
          Free 30 mins Click & Collect
        </p>
      </div>
    </div>
  );
};

export default FastServiceContainer;

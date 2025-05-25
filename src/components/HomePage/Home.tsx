import { Carousel } from "../Carousel";
import ProductCategories from "./ProductCategories";
import NewArrivals from "./NewArrivals";
import { Portfolio } from "./Portfolio";
import Partners from "./Partners";

const Home = () => {
  return (
    <div>
      <Carousel />
      <div className="container">
        <ProductCategories />
        <Partners />
        <NewArrivals />
        <Portfolio />
      </div>
    </div>
  );
};

export default Home;

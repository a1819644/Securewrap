import "../../assets/ProductCategories.css";
import ProductCategoriesCard from "./ProductCategoriesCard";

const ProductCategories = () => {
  return (
    <div className="container text-center">
      <div className="col product-categories">
        <h1>Product Catogeries</h1>
        <div className="row product-categories-card g-0">
          <ProductCategoriesCard />
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;

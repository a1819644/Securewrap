import ProductList from "./ProductList";
import Header from "../Header";
import Footer from "../Footer";
const ProductsPage = () => {
  return (
    <div>
      <div className="container-products">
        <div className="container mx-auto p-4">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

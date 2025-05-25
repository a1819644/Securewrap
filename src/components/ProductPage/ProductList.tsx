import { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { useProductContext } from "../data/ProductContext"; // Assuming this is the context path
import "../../assets/Products/ProductList.css";
import EcoFriendly from "../../imgAssets/Eco-friendly/eco-friendly-icon.svg";
import stretchFlimsImage from "../../imgAssets/Categories/stretchFlims.webp";

const ProductList = () => {
  const location = useLocation();
  const { products, loading } = useProductContext(); // Use context here

  const [sort, setSort] = useState("new");
  const [filterBrand, setFilterBrand] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [ecoFriendlyOnly, setEcoFriendlyOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // Apply initial filters from location.state once on mount
  useEffect(() => {
    if (location.state) {
      const { category, brand, search } = location.state;
      if (category) setFilterCategory([category]);
      if (brand) setFilterBrand([brand]);
      if (search) setSearchQuery(search);
    }
  }, [location.state]);

  // Reset to page 1 on filter/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterBrand,
    filterCategory,
    inStockOnly,
    ecoFriendlyOnly,
    onSaleOnly,
    searchQuery,
    sort,
  ]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      return 0; // "new" or default - no sorting or implement date if available
    });
  }, [products, sort]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((product) => {
      const matchesBrand =
        filterBrand.length > 0
          ? filterBrand.includes(product.brand || "")
          : true;
      const matchesCategory =
        filterCategory.length > 0
          ? filterCategory.includes(product.category)
          : true;
      const matchesSearch = searchQuery
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesStock = inStockOnly ? product.inStock : true;
      const matchesEco = ecoFriendlyOnly ? product.isEcoFriendly : true;
      const matchesSale = onSaleOnly ? product.onSale : true;

      return (
        matchesBrand &&
        matchesCategory &&
        matchesSearch &&
        matchesStock &&
        matchesEco &&
        matchesSale
      );
    });
  }, [
    sortedProducts,
    filterBrand,
    filterCategory,
    inStockOnly,
    ecoFriendlyOnly,
    onSaleOnly,
    searchQuery,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Pagination handlers
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Filter toggles
  const toggleBrandFilter = (brand: string) => {
    setFilterBrand((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleCategoryFilter = (category: string) => {
    setFilterCategory((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  if (loading) return <p className="text-center">Loading products...</p>;

  return (
    <div className="container mt-4">
      {/* Search Bar */}
      <div className="row searchBar">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="row filters">
        {/* Sidebar - Filters */}
        <div className="col-md-3">
          <h4 className="mb-3">Filters</h4>

          {/* In Stock */}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="inStock"
              onChange={() => setInStockOnly((prev) => !prev)}
              checked={inStockOnly}
            />
            <label className="form-check-label" htmlFor="inStock">
              In Stock Only
            </label>
          </div>

          {/* Eco Friendly */}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="ecoFriendly"
              onChange={() => setEcoFriendlyOnly((prev) => !prev)}
              checked={ecoFriendlyOnly}
            />
            <label className="form-check-label" htmlFor="ecoFriendly">
              Eco-Friendly
            </label>
          </div>

          {/* On Sale */}
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="onSale"
              onChange={() => setOnSaleOnly((prev) => !prev)}
              checked={onSaleOnly}
            />
            <label className="form-check-label" htmlFor="onSale">
              On Sale
            </label>
          </div>

          {/* Category Filters */}
          <h4 className="mt-3">Categories</h4>
          {[...new Set(products.map((p) => p.category))].map((category) => (
            <div className="form-check" key={category}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`cat-${category}`}
                onChange={() => toggleCategoryFilter(category)}
                checked={filterCategory.includes(category)}
              />
              <label className="form-check-label" htmlFor={`cat-${category}`}>
                {category}
              </label>
            </div>
          ))}
        </div>

        {/* Main Product Grid */}
        <div className="col-md-9 main-product">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Products</h2>
            <select
              className="form-select w-auto"
              onChange={(e) => setSort(e.target.value)}
              value={sort}
            >
              <option value="new">New</option>
              <option value="price_asc">Price Ascending</option>
              <option value="price_desc">Price Descending</option>
            </select>
          </div>

          {/* Product Cards */}
          <div className="row">
            {filteredProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <div
                  key={product.id}
                  className="col-lg-4 col-md-6 mb-4 product-categories-card"
                >
                  <div className="card">
                    <img
                      src={product.imageUrl || stretchFlimsImage}
                      srcSet={`
                            ${product.imageUrl} 150w,
                            ${product.imageUrl.replace(
                              ".webp",
                              "-300x300.webp"
                            )} 300w,
                            ${product.imageUrl.replace(
                              ".jpg",
                              "-600x600.webp"
                            )} 600w,
                            ${product.imageUrl.replace(
                              ".webp",
                              "-1500x1500.webp"
                            )} 1500w
                          `}
                      className="card-img-top"
                      alt={product.name}
                      loading="lazy"
                    />

                    {product.isEcoFriendly && (
                      <span className="tag-ecofriendly">
                        <img src={EcoFriendly} alt="EcoFriendly Product" />
                      </span>
                    )}

                    {product.onSale && <span className="tag-sale">Sale</span>}

                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>

                      <div className="d-flex justify-content-between align-items-center">
                        <span className="h5 mb-0">${product.price}</span>
                        <div>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <i className="bi bi-star-fill text-warning"></i>
                          <small className="text-muted">(5.0)</small>
                        </div>
                      </div>

                      <Link
                        to={`/products/${product.id}`}
                        state={{ product }}
                        className="btn"
                      >
                        Add to cart
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btn-secondary me-2"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-secondary ms-2"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

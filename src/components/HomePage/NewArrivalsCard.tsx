import React, { useEffect, useState } from "react";
import "../../assets/New Arrivals.css";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
  category: string;
  quantity?: number; // Needed for cart
}

const TTL = 1000 * 60 * 60; // 1 hour in milliseconds
const CACHE_KEY = "new_arrivals_data";
const TIMESTAMP_KEY = "new_arrivals_timestamp";

const NewArrivalsCard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        const timestamp = localStorage.getItem(TIMESTAMP_KEY);

        if (cached && timestamp && Date.now() - parseInt(timestamp) < TTL) {
          console.log("Using cached data for new arrivals");
          setProducts(JSON.parse(cached));
          setLoading(false);
          return;
        }

        const res = await fetch(
          "https://getnewarrivals-volwq6ekcq-uc.a.run.app"
        );
        const json = await res.json();

        if (json.success) {
          const data: Product[] = [];

          Object.values(json.data).forEach((category: any) => {
            Object.entries(category).forEach(
              ([id, itemData]: [string, any]) => {
                const imageUrl = itemData["image url"] || "default-image.jpg";
                console.log(imageUrl);
                data.push({
                  id,
                  name: itemData.name,
                  imageUrl: imageUrl,
                  price: itemData.price,
                  rating: 5,
                  category: itemData.category,
                });
              }
            );
          });

          const shuffledProducts = data.sort(() => Math.random() - 0.5);
          const randomProducts = shuffledProducts.slice(0, 5);

          // Cache the result
          localStorage.setItem(CACHE_KEY, JSON.stringify(randomProducts));
          localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());

          setProducts(randomProducts);
        } else {
          console.error("Failed to fetch products:", json.error);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItem = cart.find((item: Product) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <div>Loading new arrivals...</div>;

  return (
    <div className="row justify-content-center gx-3 gy-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="col-12 col-sm-6 col-md-4 col-lg d-flex"
        >
          <div className="card h-100 w-100">
            <img
              src={product.imageUrl}
              className="card-img-top"
              alt={product.name}
            />
            <div className="newarrivals-card-body">
              <h5 className="card-title align-items-center">{product.name}</h5>
              <div className="d-flex justify-content-between align-items-center">
                <span className="mb-0 price">${product.price.toFixed(2)}</span>
                <div>
                  {[...Array(Math.floor(product.rating))].map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-warning"></i>
                  ))}
                  {product.rating % 1 !== 0 && (
                    <i className="bi bi-star-half text-warning"></i>
                  )}
                  <small className="text-muted">({product.rating})</small>
                </div>
              </div>
              <div className="d-flex justify-content-center m-2">
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewArrivalsCard;

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export type Product = {
  id: string;
  name: string;
  brand?: string;
  price: number;
  inStock: boolean;
  category: string;
  description?: string;
  imageUrl: string;
  isEcoFriendly: boolean;
  onSale: boolean;
  serialNumber: string;
  qualities?: Record<string, string>;
};

type ProductContextType = {
  products: Product[];
  loading: boolean;
};

const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
});

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheKey = "product_cache";
    const cacheExpiryKey = "product_cache_expiry";
    const CACHE_DURATION_MS = 30 * 60 * 1000;

    const loadProducts = async () => {
      try {
        const cached = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheExpiryKey);
        const now = Date.now();

        if (cached && cachedTime && now - parseInt(cachedTime) < CACHE_DURATION_MS) {
          setProducts(JSON.parse(cached));
        } else {
          const res = await axios.get(
            "https://getallproductsanditems-volwq6ekcq-uc.a.run.app"
          );
          const data = res.data.data;

          const flattened: Product[] = Object.entries(data).flatMap(
            ([category, items]) =>
              Object.entries(items as Record<string, any>).map(
                ([id, product]) => ({
                  id,
                  name: product.name,
                  brand: product.brand,
                  price: product.price,
                  inStock: true,
                  category,
                  description: product.desc,
                  imageUrl: product["image url"],
                  isEcoFriendly: product.isEcoFriendly,
                  onSale: product.onSale,
                  serialNumber: product.serialNumber,
                  qualities: product.qualities ?? {},
                })
              )
          );

          localStorage.setItem(cacheKey, JSON.stringify(flattened));
          localStorage.setItem(cacheExpiryKey, now.toString());
          setProducts(flattened);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

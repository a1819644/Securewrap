const products = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 1,
  image: "https://picsum.photos/id/684/1200/630", // Placeholder image
  inStock: Math.random() > 0.5,
  brand: i % 2 === 0 ? "Kraft" : "Honeycomb",
}));

export default products;

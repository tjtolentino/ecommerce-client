import ProductCard from "./ProductCard.jsx";

function ProductList({ products }) {
  return (
    <section
      aria-label="Products Grid"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
    >
      {products.map((product) => (
        <ProductCard
          key={product._id || product.id}
          product={product}
        />
      ))}
    </section>
  );
}

export default ProductList;

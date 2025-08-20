import { ProductList } from "@/models/products";

const LatestProductList = ({ items: products }: Pick<ProductList, "items">) => {
  return (
    <>
      <h2>Latest Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </>
  );
};

export default LatestProductList;

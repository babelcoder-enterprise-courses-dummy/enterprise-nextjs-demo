import * as types from "@/models/products";
import Link from "next/link";
import Pagination from "../shared/Pagination";

const ProductList = ({ items: products, paging }: types.ProductList) => {
  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
      <Pagination {...paging}></Pagination>
    </>
  );
};

export default ProductList;

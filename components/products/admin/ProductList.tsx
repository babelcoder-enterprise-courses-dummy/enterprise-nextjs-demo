import * as types from "@/models/products";
import DataList from "../../shared/admin/DataList";

const ProductList = ({ items, paging }: types.ProductList) => {
  return (
    <>
      <DataList columns={["name", "price"]} data={items} paging={paging} />
    </>
  );
};

export default ProductList;

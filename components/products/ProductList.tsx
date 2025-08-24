import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as types from "@/models/products";
import Image from "next/image";
import Link from "next/link";
import Pagination from "../shared/Pagination";

const ProductList = ({ items: products, paging }: types.ProductList) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">All Products</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="relative min-h-[300px] object-contain">
                <Image src={product.image} alt={product.name} fill />
              </CardContent>
              <CardFooter>
                <div className="flex w-full">
                  <div className="font-bold ml-auto">{product.price} THB</div>
                </div>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <Pagination {...paging}></Pagination>
    </>
  );
};

export default ProductList;

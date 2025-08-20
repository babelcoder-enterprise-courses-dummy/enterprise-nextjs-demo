import { Paging } from "@/models/pagination";
import Link from "next/link";

const Pagination = ({ totalPages }: Paging) => {
  const links = [];
  for (let i = 1; i <= totalPages; i++) {
    links.push(
      <Link href={`/products?page=${i}`} key={i}>
        {i}
      </Link>,
    );
  }

  return <nav>{links}</nav>;
};

export default Pagination;

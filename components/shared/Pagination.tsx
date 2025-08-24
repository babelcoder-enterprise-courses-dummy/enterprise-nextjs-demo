"use client";

import { Paging } from "@/models/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as PaginationUI,
} from "../ui/pagination";

const Pagination = ({ totalPages }: Paging) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page") ?? 1);
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`?${params.toString()}`);
  }, [page, router, searchParams]);

  return (
    <PaginationUI>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={() => setPage(page - 1)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" onClick={() => setPage(page - 1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        {totalPages > page && (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => setPage(page + 1)}>
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href="#" onClick={() => setPage(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
};

export default Pagination;

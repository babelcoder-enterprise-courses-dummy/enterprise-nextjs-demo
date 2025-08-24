"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/models/products";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails";

const ProductDetailsModal = (product: Product) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) router.back();
  }, [isOpen, router]);

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        <ProductDetails {...product} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;

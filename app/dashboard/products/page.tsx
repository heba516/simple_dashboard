import React from "react";
import { ProductsTable } from "./components/ProductsTable";
import Header from "@/components/Header";

const page = () => {
  return (
    <div>
      <Header text="Products" />
      <ProductsTable />
    </div>
  );
};

export default page;

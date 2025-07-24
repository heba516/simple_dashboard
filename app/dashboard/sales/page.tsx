import Header from "@/components/Header";
import React from "react";
import { DailySales } from "./components/Daily";
import { TopProducts } from "./components/TopProducts";

const page = () => {
  return (
    <div className="space-y-4">
      <Header text="Sales" />
      <DailySales />
      <TopProducts />
    </div>
  );
};

export default page;

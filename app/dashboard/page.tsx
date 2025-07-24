"use client";
import Header from "@/components/Header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui";
import { AlertTriangle, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { DailySales } from "./sales/components/Daily";
import { TopProducts } from "./sales/components/TopProducts";
import { ReactNode } from "react";

interface IData {
  title: string;
  description: string;
  value: string;
  icon: ReactNode;
  valueClass?: string;
}

const cardsData: IData[] = [
  {
    title: "Total Sales",
    description: "This month",
    value: "$12,450",
    icon: <TrendingUp className="text-green-500 w-6 h-6" />,
  },
  {
    title: "Products",
    description: "In inventory",
    value: "135",
    icon: <Package className="text-blue-500 w-6 h-6" />,
  },
  {
    title: "Today's Orders",
    description: "Up to now",
    value: "29",
    icon: <ShoppingCart className="text-purple-500 w-6 h-6" />,
  },
  {
    title: "Low Stock",
    description: "Needs attention",
    value: "6",
    icon: <AlertTriangle className="text-red-500 w-6 h-6" />,
    valueClass: "text-red-500",
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <Header text="Dashboard" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardsData.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent
              className={`text-2xl font-bold flex items-center-safe gap-2 ${card.valueClass}`}
            >
              {card.value} {card.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DailySales />
        <TopProducts />
      </div>
    </div>
  );
}

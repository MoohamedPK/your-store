import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NormalizedCartItem, OrdersAndProducts } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTotal (items:NormalizedCartItem[]) {

  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export function groupRevenueByMonth (orders: OrdersAndProducts[]) {
    const monthlyRevenue: {month: string, revenue: number}[] = Array.from({length: 12}, (_, index) => {
      const monthName = new Date(0, index).toLocaleString("default", {month: "short"});

      return {month: monthName, revenue : 0};
    });

    orders.forEach((order) => {
      if (order.status === "DELIVERED") {
        const month = new Date(order.createdAt).getMonth();
        monthlyRevenue[month].revenue += order.totalPrice;
      }
    });

    return monthlyRevenue;
} 

export function groupOrdersByStatus (orders: OrdersAndProducts[]) {

  const countStatus: Record<string, number> = {
  PENDING: 0,
  PROCESSING: 0,
  SHIPPED: 0,
  DELIVERED: 0,
  CANCELLED: 0
  }

  orders.forEach((order) => {
    if (countStatus[order.status] !== undefined) {
      countStatus[order.status]++
    }
  })

  return Object.entries(countStatus).map(([status, count]) => ({
    name: status,
    value: count
  }))

}
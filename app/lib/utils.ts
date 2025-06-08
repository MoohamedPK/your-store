import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NormalizedCartItem } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTotale (items:NormalizedCartItem[]) {

  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
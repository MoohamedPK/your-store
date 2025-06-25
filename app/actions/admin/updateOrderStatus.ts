"use server";
import { prisma } from "@/app/lib/prisma";
import { OrderStatus } from "@prisma/client";

export async function updateOrderStatus({
  orderId,
  status
}: {
  orderId: string;
  status: string;
}) {

  try {
    // 1. Validate input
    if (!orderId || !status) {
      throw new Error("Missing required fields");
    }

    // 2. Verify the status is valid
    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      throw new Error(`Invalid status: ${status}`);
    }

    // 3. Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId }
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    // 4. Prevent invalid status transitions
    if (existingOrder.status === "CANCELLED" && status !== "CANCELLED") {
      throw new Error("Cannot modify a cancelled order");
    }

    // 5. Update the order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { 
        status: status as OrderStatus,
        updatedAt: new Date() 
      },
      include: {
        products: {
          include: {
            Product: true
          }
        }
      }
    });

    // 6. Optional: Add business logic for specific status changes
    if (status === "CANCELLED") {
      // Restore product stock
      await Promise.all(
        updatedOrder.products.map(async (item) => {
          await prisma.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity
              }
            }
          });
        })
      );
    }

    return {
      success: true,
      message: `Order status updated to ${status}`,
      data: {
        orderId: updatedOrder.id,
        updatedAt: updatedOrder.updatedAt,
        newStatus: updatedOrder.status
      }
    };

  } catch (error) {
    console.error("Error updating order status:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update order status",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
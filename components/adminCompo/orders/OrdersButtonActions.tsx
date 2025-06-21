"use client";

import { cancelOrder } from "@/app/actions/admin/cancelOrder";
import { ChevronDown, X } from "lucide-react";
import { ChangeEventHandler, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
import { OrderWithDetails } from "@/app/lib/definitions";
import { updateOrderStatus } from "@/app/actions/admin/updateOrderStatus";


export const CancelOrderBtn = ({orderId} : {orderId: string}) => {

    const [isPending, startTransition] = useTransition();
    const {refresh} = useRouter()

    const handleOrderCanceling = () => {

        startTransition(async function () {
            const response = await cancelOrder(orderId);

            if (response.success) {
                toast.success(response.message as string);
                refresh()
            } else {
                toast.error(response.message as string)
            }
        })
    }

    return (
        <button onClick={handleOrderCanceling} disabled={isPending}  className="flex items-center button-hover rounded-lg cursor-pointer default-border px-6 py-2 text-sm font-semibold">
            {isPending ? (
                <Spinner />
            ) : (
                <div className="flex">
                    <X size={18} className="mr-2"/>
                    Cancel Order
                </div>
            ) }
        </button>
    )
}

export const UpdateOrderBtn = ({orderId}: {orderId: string}) => {

    const [isPending, startTransition] = useTransition();
    
    const {refresh} = useRouter();

    const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        
        startTransition(async () => {
            const response = await updateOrderStatus({ 
                orderId, 
                status: newStatus 
            });
            console.log("client")
            refresh();
        });
    };

    return (
        <div className=""> 
            {/* <button className="flex items-center button-hover rounded-lg cursor-pointer default-border px-6 py-2 text-sm font-semibold">
                <ChevronDown size={18} className="mr-2"/>
                Update Status
            </button> */}

            <form action="" className="">
                <select onChange={handleStatusChange} name="" id="" className="button-hover rounded-lg cursor-pointer default-border px-6 py-2 text-sm font-semibold">
                    <option value="">Update Status</option>
                    <option value="">PENDING</option>
                    <option value="">PROCESSING</option>
                    <option value="">SHIPPED</option>
                    <option value="">DELIVERED</option>
                    <option value="">CANCELLED</option>
                </select>
            </form>
        </div>
    )
}
"use client";

import { cancelOrder } from "@/app/actions/admin/cancelOrder";
import { X } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Spinner from "@/components/ui/Spinner";
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
            
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message)
            }
            refresh();
        });
    };

    return (
        <div className=""> 
            <select disabled={isPending} onChange={(e) => handleStatusChange(e)} name="" id="" className="button-hover rounded-lg cursor-pointer default-border px-6 py-2 text-sm font-semibold">
                <option value="">Update Status</option>
                <option value="PENDING">PENDING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
            </select>
        </div>
    )
}
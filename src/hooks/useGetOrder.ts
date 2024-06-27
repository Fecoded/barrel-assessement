import { Order } from "@src/utils/dbOperation"
import { useState } from "react"

const baseUrl = "http://localhost:3000"

export const useGetOrder = () => {
    const [order, setOrder] = useState<Order>(Object);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetOrder = async (id: string) => {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/api/orders/${id}`);
        const data = await res.json();
        setOrder(data?.data);
        setIsLoading(false);
    }

    return { order, isLoading, handleGetOrder}
}
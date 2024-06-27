import { Order } from "@src/utils/dbOperation"
import { useState } from "react"

const baseUrl = "http://localhost:3000"

export const useGetOrderList = () => {
    const [orderList, setOrderList] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetOrderList = async () => {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/api/orders`);
        const data = await res.json();
        setOrderList(data?.data);
        setIsLoading(false);
    }

    return { orderList, isLoading, handleGetOrderList}
}
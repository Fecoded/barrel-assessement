import { Order } from "@src/utils/dbOperation"
import { useState } from "react"

const baseUrl = "http://localhost:3000"

type RemoveOrderId = Omit<Order, "id">;

export const useCreateOrder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError]= useState(false);
    const [error, setError] = useState("");

    const handleCreateOrder = async (payload: RemoveOrderId) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${baseUrl}/api/orders`, {
                method: "POST",
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            setIsLoading(false);
            setIsError(false)
            return data;
            
        } catch (error) {
             setIsLoading(false);
             setIsError(true);
             if(error instanceof Error) {
                setError(error.message);
                return error.message
            };
             return error
        }

    }

    return { isError, error, isLoading, handleCreateOrder}
}
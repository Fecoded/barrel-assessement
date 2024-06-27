import { useState } from "react"
import { useGetOrderList } from "./useGetOrderList";

const baseUrl = "http://localhost:3000"

export const useDeleteOrder = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError]= useState(false);
    const [error, setError] = useState("");


    const handleDeleteOrder = async (id: number) => {
        setIsLoading(true);

         try {
            const res = await fetch(`${baseUrl}/api/orders/${id}`, {
                 method: "DELETE"
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

    return { isError, error, isLoading, handleDeleteOrder}
}
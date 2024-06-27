"use client";
// Core
import { useParams, useRouter } from "next/navigation"
import { FormEvent, useEffect, useReducer } from "react";

// Components
import { Layout } from "./Layout";

// Styled
import { Button, ErrorText, Input, MaxWidth, SelectInput, Spacer } from "@src/styles"

// Utils
import { Order } from "@src/utils/dbOperation";
import { useCreateOrder } from "@src/hooks/useCreateOrder";
import { useGetOrder } from "@src/hooks/useGetOrder";
import { useEditOrder } from "@src/hooks/useEditOrder";

type RemoveOrderId = Omit<Order, 'id'>;

const OrderForm = () => {
    const router = useRouter();
    const param = useParams();

    const orderId = param?.id as string;

    const [order, setOrder] = useReducer(
        (prev: RemoveOrderId, next: Partial<RemoveOrderId>) => {
        const newEvent = { ...prev, ...next };

        return newEvent
    }, {
        itemName: "",
        quantity: 0,
        status: ""
    });

    const {itemName, quantity, status} = order;

    const handleChange = (e: FormEvent<HTMLElement>) => {
        const event = e.target as HTMLInputElement;
		setOrder({ ...order, [event.name]: event.value });
	};

    const {isLoading, isError, error, handleCreateOrder} = useCreateOrder();
    const {isLoading: isEditLoading, isError: isEditError, error: editError, handleEditOrder} = useEditOrder();
    const {order: orderData, handleGetOrder} = useGetOrder();
    
    const handleGoBack = () => router.back();

    const handleSubmit = async () => {
        const payload = {
             itemName,
             quantity: +quantity,
             status
        }
        if(orderId){
            await handleEditOrder(orderId, payload);
            if(!isEditError) {
                handleGoBack();
            }
        } else {
            await handleCreateOrder(payload);
            if(!isError) {
                handleGoBack();
            }

        }
    }

    const handleDisable = () => {
        if(itemName !== "" && !isNaN(quantity)  && status !== "") {
            return false;
        }

        return true;
    }


    const handleRequest = async () => {
        if(param?.id) {
            await handleGetOrder(param?.id as string);
        }
    }

    useEffect(() => {
        if(orderData){
            setOrder({
                itemName: orderData?.itemName,
                quantity: orderData?.quantity,
                status: orderData?.status
            })
        }
    }, [orderData])

    useEffect(() => {
        handleRequest();
          // eslint-disable-next-line
    },[param?.id]);

    return(
         <Layout title="Procurement Automation App" description={`${orderId ? "Edit" : "Create"} Order`}>
                <MaxWidth $maxWidth="700px">
                    <Button $outlined onClick={handleGoBack}>Back</Button>
                    <Spacer size="20px" />
                    {isError || isEditError && <ErrorText>{error || editError}</ErrorText>}
                    <Input type="text" placeholder="Enter name" name="itemName" value={itemName} onChange={handleChange} />
                    <Input type="number" placeholder="Enter Quantity" name="quantity" value={quantity} onChange={handleChange} />
                    <SelectInput value={status} name="status" onChange={handleChange} aria-label="Order Status">
                        <option value="">Choose a status</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Processing">Processing</option>
                        <option value="In-Transit">In-Transit</option>
                        <option value="Failed">Failed</option>
                    </SelectInput>
                    <Spacer size="10px" />
                    <Button disabled={handleDisable() || isLoading || isEditLoading} onClick={handleSubmit}>Submit</Button>
                </MaxWidth>
         </Layout>
              
    )
}


export default OrderForm
"use client"

// Core
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// Components
import { Layout } from "./Layout"

// Utils
import { useGetOrder } from "@src/hooks/useGetOrder";
import { LoaderIcon } from "@src/utils/loader";
import { getStatus } from "@src/utils/helper";

// Styled
import { BadgeStatus, Button, DetailsLabel, DetailsText, MaxWidth, Spacer } from "@src/styles"

const OrderDetails = () => {
     const router = useRouter();
     const param = useParams();

     const {order, isLoading, handleGetOrder} = useGetOrder();

    const handleGoBack = () => router.back();

    const handleRequest = async () => {
        if(param?.id) {
            await handleGetOrder(param?.id as string);
        }
    }

    useEffect(() => {
        handleRequest()
          // eslint-disable-next-line
    },[param?.id]);


    return(
          <Layout title="Procurement Automation App" description="Order Details">
                 <MaxWidth $maxWidth="700px">
                    <Button $outlined onClick={handleGoBack}>Back</Button>
                    <Spacer size="20px" />
                    {isLoading ?
                        <LoaderIcon />    
                        :
                        <div>
                            <DetailsLabel>Name</DetailsLabel>
                            <DetailsText>{order?.itemName}</DetailsText>
                            <Spacer size="20px" />
                            <DetailsLabel>Quantity</DetailsLabel>
                            <DetailsText>{order?.quantity}</DetailsText>
                            <Spacer size="20px" />
                            <DetailsLabel>Status</DetailsLabel>
                            <DetailsText> 
                                <BadgeStatus color={getStatus(order.status)}>
                                    {order.status}
                                </BadgeStatus>
                            </DetailsText>

                        </div>
                }
                 </MaxWidth>
          </Layout>
    )
}

export default OrderDetails
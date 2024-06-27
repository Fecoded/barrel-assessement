"use client"

// Core
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link";

// Components
import { Layout } from "./Layout";

// Utils
import { useGetOrderList } from "@src/hooks/useGetOrderList"
import { LoaderIcon } from "@src/utils/loader"
import { getStatus } from "@src/utils/helper";
import { useDeleteOrder } from "@src/hooks/useDeleteOrder";
import { Order } from "@src/utils/dbOperation";

// Styled
import { BadgeStatus, Button, ButtonWrapper, ErrorText, Flex, MaxWidth, Paragraph, Spacer, Table, TableBox } from "@src/styles";
import styles from '@src/app/page.module.css';

const header = ["Name", "Quantity", "Status", "Action"]

const OrderList = () => {
    const [orderData, setOrderData] = useState<Order[]>([])
    const router = useRouter();
    const {orderList, isLoading, handleGetOrderList} = useGetOrderList();

    const {isError, error, handleDeleteOrder} = useDeleteOrder();

    const handleOrderDelete = async (id: number) => {
        await handleDeleteOrder(id);
        const remainingOrder = orderData.filter((order) => order.id !== id);
        setOrderData(remainingOrder)
    }

    const handleOrderList = async () => {
        await handleGetOrderList();
    }

    useEffect(() => {
        handleOrderList();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(orderList){
            setOrderData(orderList)
        }
    }, [orderList])


    const handleGoToOrderForm = () => router.push("/order/new");


    return(
        <Layout title="Procurement Automation App" description="Order List">
                <MaxWidth $maxWidth="700px">
                    <ButtonWrapper>
                        <Button $outlined onClick={handleGoToOrderForm}>Create</Button>
                    </ButtonWrapper>
                    <Spacer size="20px" />
                     {isError && <ErrorText>{error}</ErrorText>}
                    {isLoading ? 
                        <LoaderIcon /> :
                        orderData?.length > 0 ? 
                        <TableBox $maxWidth="700px">
                            <Table>
                                <thead>
                                    <tr>
                                        {header.map((item, idx) => (
                                            <th key={idx}>
                                                <>{item}</>
                                            </th>
                                        ))}
                                    </tr>
                            </thead>
                            <tbody>
                                {orderData?.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.itemName}</td>
                                        <td>{item.quantity}</td>
                                        <td>
                                            <BadgeStatus color={getStatus(item.status)}>
                                                {item.status}
                                            </BadgeStatus>
                                        </td>
                                        <td>
                                            <Flex $gap="10px">
                                                <Link href={`/order/${item.id}`}>View</Link> |
                                                <Link href={`/order/edit/${item.id}`}>Edit</Link> |
                                                <ErrorText data-testid={`delete-button-${item.id}`} className={styles.cursor} onClick={() => handleOrderDelete(item.id)}>Delete</ErrorText>
                                            </Flex>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </Table>

                        </TableBox>
                    :
                    <Paragraph $center>No Order available yet</Paragraph>
                    }
                </MaxWidth>
          </Layout>
    )
}




export default OrderList
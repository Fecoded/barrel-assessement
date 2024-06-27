import { useRouter } from "next/navigation";
import { render, screen, waitFor } from "@testing-library/react";

import { useGetOrderList } from "@src/hooks/useGetOrderList";
import { useDeleteOrder } from "@src/hooks/useDeleteOrder";
import OrderList from "@src/components/OrderList";


// Mock dependencies
jest.mock('next/navigation');
jest.mock('@src/hooks/useDeleteOrder');
jest.mock('@src/hooks/useGetOrderList');


describe('Order List Component', () => {
     const mockRouter = { push: jest.fn() };
     const mockOrderList = {
            orderList: [
                { id: 1, itemName: 'Laptop', quantity: 2, status: "Delivered" },
                { id: 2, itemName: 'Phone', quantity: 5, status: "Delivered" },
            ],
            isLoading: false,
            handleGetOrderList: jest.fn()
     }
     const mockDeleteOrder = {
            isError: false,
            error: "",
            handleDeleteOrder: jest.fn()
     }

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useGetOrderList as jest.Mock).mockReturnValue(mockOrderList);
        (useDeleteOrder as jest.Mock).mockReturnValue(mockDeleteOrder)
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render order list', async () => {
        render(<OrderList />);

        expect(screen.getByText('Create')).toBeInTheDocument();
        expect(screen.getByText('Laptop')).toBeInTheDocument();
        expect(screen.getByText('Phone')).toBeInTheDocument();
    });

    it('should navigate to create form page', async () => {
        render(<OrderList />);

        const CreateButton = screen.getByText("Create");
        CreateButton.click();

        expect(mockRouter.push).toHaveBeenCalled();
    });

    it('should handle delete', async () => {
        const { handleDeleteOrder } = useDeleteOrder();
        render(<OrderList />);

        const DeleteButton = screen.getByTestId("delete-button-1");
        DeleteButton.click();

        await waitFor(()=> expect(handleDeleteOrder).toHaveBeenCalledWith(1));
        expect(screen.queryByText("Laptop")).not.toBeInTheDocument();
    })
})
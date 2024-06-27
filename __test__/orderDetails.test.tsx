import { render, screen, waitFor } from '@testing-library/react';
import {useParams, useRouter} from 'next/navigation';
import {useGetOrder} from '@hooks/useGetOrder';
import OrderDetails from "@components/OrderDetails";


// Mock dependencies
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useParams: jest.fn(),
}));

jest.mock('@src/hooks/useGetOrder');

describe('Order Details Component', () => {
    const mockRouter = { back: jest.fn() };
    const mockParams = { id: 1 };
    const mockOrder = { itemName: "Laptop", quantity: 2, status: "Delivered" };

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useParams as jest.Mock).mockReturnValue(mockParams);
        (useGetOrder as jest.Mock).mockReturnValue({
            order: mockOrder,
            isLoading: false,
            handleGetOrder: jest.fn()
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render order details", async () => {
        render(<OrderDetails />)

        expect(screen.getByText("Back")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("Laptop")).toBeInTheDocument();
            expect(screen.getByText("2")).toBeInTheDocument();
            expect(screen.getByText("Delivered")).toBeInTheDocument();
        });
    })

    it("should show loader icon while loading", async () => {
         (useGetOrder as jest.Mock).mockReturnValue({
            order: null,
            isLoading: true,
            handleGetOrder: jest.fn()
        });

         render(<OrderDetails />);

         expect(screen.getByTestId("loader-icon")).toBeInTheDocument();
    });

    it("should call router.back on Back button click", async () => {
         render(<OrderDetails />);

         const backButton = screen.getByText("Back");
         backButton.click();

        expect(mockRouter.back).toHaveBeenCalled();
    })
})
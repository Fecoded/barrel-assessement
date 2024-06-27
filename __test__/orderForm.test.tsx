

import OrderForm from '@src/components/OrderForm';
import { useCreateOrder } from '@src/hooks/useCreateOrder';
import { useEditOrder } from '@src/hooks/useEditOrder';
import userEvent from '@testing-library/user-event';
import { useGetOrder } from '@src/hooks/useGetOrder';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams, useRouter } from 'next/navigation';



// Mock dependencies
jest.mock('next/navigation');
jest.mock('@src/hooks/useCreateOrder');
jest.mock('@src/hooks/useGetOrder');
jest.mock('@src/hooks/useEditOrder');



describe('Order Form Component', () => {
     const mockRouter = { back: jest.fn(), push: jest.fn() };
     const mockGetOrder = { order: null, handleGetOrder: jest.fn()};
     const mockCreateOrder = {isLoading: false, isError: false, error: "", handleCreateOrder: jest.fn()}
     const mockEditOrder = {isLoading: false, isError: false, error: "", handleEditOrder: jest.fn()}
     const mockParams = { id: 1 };

      beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useParams as jest.Mock).mockReturnValue(mockParams);
        (useGetOrder as jest.Mock).mockReturnValue(mockGetOrder);
        (useCreateOrder as jest.Mock).mockReturnValue(mockCreateOrder);
        (useEditOrder as jest.Mock).mockReturnValue(mockEditOrder);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });



    it('should form allow user to edit existing order', async () => {
        const mockOrder = {
            id: 1,
            itemName: 'Existing Item',
            quantity: 5,
            status: 'Processing',
        };
        
        (useGetOrder as jest.Mock).mockReturnValueOnce({
            order: mockOrder,
            handleGetOrder: jest.fn(),
        });

        render(<OrderForm />);

        const itemNameInput = screen.getByPlaceholderText('Enter name');
        const quantityInput = screen.getByPlaceholderText('Enter Quantity');
        const statusSelect = screen.getByLabelText('Order Status');
        const submitButton = screen.getByText('Submit');

         await waitFor(() => {
            expect(itemNameInput).toHaveValue('Existing Item');
            expect(quantityInput).toHaveValue(5);
            expect(statusSelect).toHaveValue('Processing');
        });

        // clear the input field
        await userEvent.clear(itemNameInput);
        await userEvent.type(itemNameInput, 'Updated Item');
        await userEvent.clear(quantityInput);
        await userEvent.type(quantityInput, '15');
        await userEvent.selectOptions(statusSelect, 'Processing');
        
        expect(itemNameInput).toHaveValue('Updated Item');
        expect(quantityInput).toHaveValue(15);
        expect(statusSelect).toHaveValue('Processing');
        expect(submitButton).not.toBeDisabled();

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockEditOrder.handleEditOrder).toHaveBeenCalledWith(mockOrder.id, {
                itemName: 'Updated Item',
                quantity: 15,
                status: 'Processing',
            });
        });
    })
});



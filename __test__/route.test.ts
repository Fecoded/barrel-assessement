import { createMocks } from 'node-mocks-http'

import {GET, POST} from '@src/app/api/orders/route';
import { getData } from '@src/utils/dbOperation';
import { NextRequest } from 'next/server';

const mockOrders = [
    { id: 1, itemName: 'Laptop', quantity: 2, status: "Delivered" },
    { id: 2, itemName: 'Phone', quantity: 5, status: "Delivered" },
];

// Mock DBOperation
jest.mock('@src/utils/dbOperation', () => ({
  getData: jest.fn(),
  writeDB: jest.fn(),
}));

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options = {}) => {
      return {
        status: options.status || 200,
        json: () => Promise.resolve(data),
        text: () => Promise.resolve(JSON.stringify(data)),
      ...options
      };
    })}
}));


const mockOrderResponse = {
    success: true,
    data: mockOrders
}

const newMockOrder = { itemName: "Tablet", quantity: 2, status: "Pending"};

const mockNewOrderResponse = {
    success: true,
    data:  {...newMockOrder, id: 3 }
}


describe('Order API', () => {
     beforeEach(() => {
        fetchMock.resetMocks();
     });

    it('should get all orders', async () => {
       (getData as jest.Mock).mockReturnValue({ orders: mockOrders });
        const response = await GET();
        expect(response.status).toBe(200);
        expect(await response.json()).toEqual(mockOrderResponse);
    });

    it('should create an order successfully', async () => {
         (getData as jest.Mock).mockReturnValue({ orders: mockOrders });

          const { req } = createMocks({
            method: 'POST',
            body: newMockOrder,
          });

          req.headers['content-type'] = 'application/json';

        // Simulate req.json() method
        req.json = async () => req.body;
        const request = req as unknown as NextRequest;
        const response = await POST(request);
        const responseBody = await response.json();
        expect(response.status).toBe(201);
        expect(responseBody).toMatchObject(mockNewOrderResponse);
        expect(responseBody).toHaveProperty('data.id');
    })
})
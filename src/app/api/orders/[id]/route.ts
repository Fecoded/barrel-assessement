import { getData, writeDB } from '@src/utils/dbOperation';
import { NextResponse } from 'next/server';
import path from 'path';

const dbPath = path.join(__dirname, "../../../../../../src", 'db.json');

export async function GET(req: Request, cxt: any) {
    try {
        const data = getData(dbPath);
        const {params} = cxt;
        const { id } = params;
        const order = data.orders.find(order => order.id === +id);
        if (!order) {
            return NextResponse.json({
                success: false,
                message: "Order not found"
            },{status: 404});
        } 

        return NextResponse.json({
            success: true,
            data: order
        }, {status: 200});
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal server error' }, {status: 500});
    }
}

export async function PUT(req: Request, cxt: any) {
    try {
        const data = getData(dbPath);
        const {params} = cxt;
        const { id } = params;
        const payload = await req.json();
        const idx = data.orders.findIndex(order => order.id === +id);

        if (idx === -1) {
            return NextResponse.json({ success: false, message: "Order not found"}, {status: 404});
        } 
        
        data.orders[idx] = { ...data.orders[idx], ...payload };
        writeDB(data, dbPath);
        return NextResponse.json({ success: true, data: data.orders[idx]}, {status: 200});

    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal server error' }, {status: 500});
    }
}


export async function DELETE(req: Request, cxt: any) {
    try {
         const data = getData(dbPath);
        const {params} = cxt;
        const { id } = params;

        const order = data.orders.find(order => order.id === +id);
  
        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found"}, {status: 404});
        } 

        const newOrders = data.orders.filter(order => order.id !== +id);
        data.orders = newOrders;
        writeDB(data, dbPath);
        return NextResponse.json({ success: true, message: "Order deleted"}, {status: 200});
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Internal server error' }, {status: 500});
    }
}
import { Order, getData, writeDB } from '@src/utils/dbOperation';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const dbPath = path.join(__dirname, "../../../../../src", 'db.json');
 
export async function GET() {
  try {
     const data = getData(dbPath);
     return NextResponse.json({ success: true, data: data.orders}, {status: 200})
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, {status: 500});
  }
}


export async function POST(req: NextRequest) {
  try {
    const data = getData(dbPath);
    const payload = await req.json();
    const newOrder: Order = payload;
    
    // console.log(newOrder)
    newOrder.id = data.orders.length ? data.orders[data.orders.length - 1].id + 1 : 1;

    data.orders.push(newOrder);
    writeDB(data, dbPath);

    return NextResponse.json({ success: true, data: newOrder}, {status: 201});
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Internal server error' }, {status: 500}); 
  }
}


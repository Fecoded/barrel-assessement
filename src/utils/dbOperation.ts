import fs from 'fs';

export type Order = {
    id: number;
    itemName: string;
    quantity: number;
    status: string;
}

// Read from db.json
export const getData = (dbPath: string):{ orders: Order[] } => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

// Write to db.json
export const writeDB = (data: { orders: Order[] }, dbPath: string) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
};

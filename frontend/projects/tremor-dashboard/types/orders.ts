export interface OrderProduct {
  id: number;
  name: string;
  count: number;
  price?: number;
  url?: string;
}

export interface Order {
  id: number;
  createdAt: string;
  status: number;
  customer: {
    id: number;
    fullName: string;
    avatar?: string;
  };
  products: OrderProduct[];
  revenue: number;
}

export interface OrderResponse {
  results: Order[];
  total: number;
  message?: string;
}

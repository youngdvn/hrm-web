export type CustomerStatus = "LEAD" | "PROSPECT" | "ACTIVE" | "INACTIVE";

export type OrderStatus = "DRAFT" | "CONFIRMED" | "PROCESSING" | "COMPLETED" | "CANCELLED";

export interface Customer {
  id: string;
  code: string;
  name: string;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  status: CustomerStatus;
  salesRepId?: string | null;
  notes?: string | null;
  salesRep?: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
    email: string;
    department?: { name: string } | null;
  } | null;
  _count?: {
    salesOrders: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  unitPrice: number;
  costPrice?: number | null;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  product: {
    id: string;
    code: string;
    name: string;
    unit: string;
  };
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  salesRepId: string;
  status: OrderStatus;
  orderDate: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  commissionRate: number;
  commissionAmount: number;
  notes?: string | null;
  customer: {
    id: string;
    code: string;
    name: string;
    company?: string | null;
    phone?: string | null;
  };
  salesRep: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
  };
  items: OrderItem[];
  invoices?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface SalesStats {
  totalRevenue: number;
  totalCommission: number;
  totalOrders: number;
  completedOrders: number;
  processingOrders: number;
  draftOrders: number;
  totalCustomers: number;
  topSalesReps: {
    salesRepId: string;
    salesRepName: string;
    employeeCode: string;
    departmentName: string;
    orderCount: number;
    totalSales: number;
    totalCommission: number;
  }[];
}


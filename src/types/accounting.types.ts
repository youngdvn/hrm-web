export type TransactionType = "INCOME" | "EXPENSE";

export type PaymentMethod = "CASH" | "BANK_TRANSFER";

export type TransactionCategory =
  | "SALES_REVENUE"
  | "PAYROLL"
  | "OFFICE_EXPENSE"
  | "EQUIPMENT"
  | "MARKETING"
  | "OTHER";

export type InvoiceStatus = "UNPAID" | "PARTIAL" | "PAID" | "OVERDUE" | "CANCELLED";

export interface Transaction {
  id: string;
  transactionNumber: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  paymentMethod: PaymentMethod;
  transactionDate: string;
  invoiceId?: string | null;
  referenceCode?: string | null;
  notes?: string | null;
  createdById?: string | null;
  createdBy?: {
    id: string;
    fullName: string;
    email: string;
  } | null;
  invoice?: {
    id: string;
    invoiceNumber: string;
    amount: number;
    customer?: {
      name: string;
      company?: string | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId?: string | null;
  customerId?: string | null;
  amount: number;
  paidAmount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate?: string | null;
  notes?: string | null;
  customer?: {
    id: string;
    code: string;
    name: string;
    company?: string | null;
    phone?: string | null;
    email?: string | null;
  } | null;
  order?: {
    id: string;
    orderNumber: string;
    finalAmount: number;
  } | null;
  transactions?: Transaction[];
  createdAt: string;
  updatedAt: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  cashBalance: number;
  bankBalance: number;
  totalReceivables: number;
  overdueCount: number;
  unpaidCount: number;
  expenseBreakdown: {
    category: string;
    label: string;
    amount: number;
  }[];
  monthlyTrend: {
    month: string;
    income: number;
    expense: number;
    profit: number;
  }[];
}


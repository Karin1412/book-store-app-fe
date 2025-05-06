import { Invoice, InvoiceDetail } from "@/types/invoice";
import { mockBooks } from "./book";
import { mockUsers } from "./user";
import { mockCustomers } from "./customer";

export const mockInvoiceDetails: InvoiceDetail[] = [
  {
    invoiceId: "inv-001",
    book: mockBooks[0],
    quantity: 2,
    unitPrice: 35,
  },
  {
    invoiceId: "inv-001",
    book: mockBooks[1],
    quantity: 1,
    unitPrice: 38,
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv-001",
    customer: mockCustomers[0],
    totalPrice: 108,
    totalImportPrice: 62,
    amountReceived: 98,
    amountPriceUsePoint: 10,
    pointUse: 10,
    pointReceive: 5,
    createdBy: mockUsers[0],
    createdAt: new Date("2025-05-01T12:00:00Z"),
    details: mockInvoiceDetails,
  },
];

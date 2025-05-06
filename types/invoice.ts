import { Book } from "./book";
import { SimpleCustomer } from "./customer";
import { User } from "./user";

export type Invoice = {
  id: string;
  customer: SimpleCustomer;
  totalPrice: number;
  totalImportPrice: number;
  amountReceived: number;
  amountPriceUsePoint: number;
  pointUse: number;
  pointReceive: number;
  createdBy: User;
  createdAt: Date;
  details: InvoiceDetail[];
};

export type InvoiceDetail = {
  invoiceId: string;
  book: Book;
  quantity: number;
  unitPrice: number;
};

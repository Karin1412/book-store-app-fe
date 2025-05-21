import { Author } from "./author";
import { Category } from "./category";
import { Publisher } from "./publisher";

export type Book = {
  id: string;
  title: BookTitle;
  imageUrl: string;
  publisher: Publisher;
  quantity: number;
  reprint: number;
  listedPrice: number;
  unitPrice: number;
  importPrice: number;
  isActive: boolean;
};

export type BookTitle = {
  id: string;
  name: string;
  author: Author;
  category: Category;
  isActive: boolean;
  description: string;
};

export type BookPosition = {
  id: string;
  zone: string;
  shelf: string;
  row: string;
  note: string;
  bookTitle: BookTitle;
};

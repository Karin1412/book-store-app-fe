import { Author } from "./author";
import { Publisher } from "./publisher";

export type Book = {
  id: string;
  title: string;
  imageUrl: string;
  author: Author;
  publisher: Publisher;
  quantity: number;
  listedPrice: number;
  salePrice: number;
  importPrice: number;
  isActive: boolean;
};

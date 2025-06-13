import { Book } from "@/types/book";
import { GET, PATCH, POST } from "./utils";
import { convertBookTitleResponse } from "./book-title";

export const convertBookResponse = (book: any): Book => {
  //  res = {
  //   bookTitle: [Object],
  //   edition: 1,
  //   id: "s100ma",
  //   img: "https://cdn0.fahasa.com/media/catalog/product/1/1/1118020260362_1.jpg",
  //   importPrice: 40000,
  //   listedPrice: 46000,
  //   name: "100 Món Ăn Ngày Thường",
  //   publisher: [Object],
  //   quantity: 29,
  //   sellPrice: 46000,
  // };

  return {
    id: book.id,
    title: convertBookTitleResponse(book.bookTitle),
    reprint: book.edition,
    imageUrl: book.img,
    listedPrice: book.listedPrice,
    unitPrice: book.sellPrice,
    publisher: book.publisher,
    quantity: book.quantity,
    importPrice: book.importPrice,
    isActive: book.isActive || true,
  };
};

export const CreateBook = async (book: Book) => {
  const data = {
    bookTitleId: book.title.id,
    edition: book.reprint,
    id: "",
    image: book.imageUrl,
    listedPrice: book.listedPrice,
    publisherId: book.publisher.id,
    sellPrice: book.unitPrice,
  };
  return POST("/books", data);
};

export const GetAllBooks = async () => {
  return GET("/books/all").then((response) => {
    return response.data.map(convertBookResponse);
  });
};

export const GetBookById = async (id: string) => {
  return GET(`/books/${id}`);
};

export const UpdateBook = async (id: string, book: Book) => {
  const data = {
    bookTitleId: book.title.id,
    edition: book.reprint,
    image: book.imageUrl,
    listedPrice: book.listedPrice,
    publisherId: book.publisher.id,
    sellPrice: book.unitPrice,
  };
  return PATCH(`/books/${id}/info`, data);
};

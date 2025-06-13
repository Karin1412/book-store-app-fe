import { mockBooks } from "./book";

export const borrowedBooks = [
  {
    id: "br1",
    book: mockBooks[0],
    borrowerName: "Nguyễn Văn A",
    borrowDate: "2025-06-01",
    returnDate: null,
    isReturned: false,
  },
  {
    id: "br2",
    book: mockBooks[1],
    borrowerName: "Trần Thị B",
    borrowDate: "2025-05-15",
    returnDate: "2025-06-10",
    isReturned: true,
  },
];

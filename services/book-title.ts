import Axios from "@/config/axios";
import { BookTitle } from "@/types/book";
import { GET, PATCH, POST } from "./utils";

export const convertBookTitleResponse = (data: any): BookTitle => {
  return {
    id: data.id,
    name: data.name,
    description: data.desc,
    author: data.authors[0],
    category: data.categories[0],
    isActive: data.isActive ?? true, // Default to true if isActive is not provided
  };
};

export const GetAllBookTitles = async () => {
  return GET("/booktitles/all").then((response) => {
    return response.data.map(convertBookTitleResponse);
  });
};

export const CreateBookTitle = async (bookTitle: BookTitle) => {
  const data = {
    authorIds: [bookTitle.author.id],
    categoryIds: [bookTitle.category.id],
    desc: bookTitle.description,
    id: "",
    name: bookTitle.name,
  };
  return POST("/booktitles", data);
};

export const GetBookTitleById = async (id: string) => {
  return GET(`/booktitles/${id}`);
};

export const UpdateBookTitle = async (id: string, data: any) => {
  return PATCH(`/booktitles/${id}/info`, data);
};

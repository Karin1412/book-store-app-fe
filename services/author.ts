import { GET, PATCH, POST } from "./utils";

export const CreateAuthor = async (name: string) => {
  const data = {
    name,
  };
  return POST("/authors", data).then((response) => response.data);
};

export const GetAllAuthors = async () => {
  return GET("/authors/all").then((response) => response.data);
};

export const GetAuthorById = async (id: string) => {
  return GET(`/authors/${id}`).then((response) => response.data);
};

export const UpdateAuthor = async (id: string, name: string) => {
  const data = {
    name,
  };
  return PATCH(`/authors/${id}`, data).then((response) => response.data);
};

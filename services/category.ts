import { GET, PATCH, POST } from "./utils";

export const GetCategories = async () => {
  return GET("/categories/all");
};

export const CreateCategory = async (name: string) => {
  const data = {
    name,
  };
  return POST("/categories", data);
};

export const UpdateCategory = async (id: string, name: string) => {
  const data = {
    name,
  };
  return PATCH(`/categories/${id}`, data);
};

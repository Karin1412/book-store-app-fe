import { GET, PATCH, POST } from "./utils";

export const GetPublishers = async () => {
  return GET("/publishers/all");
};

export const CreatePublisher = async (name: string) => {
  const data = {
    name,
  };
  return POST("/publishers", data);
};

export const UpdatePublisher = async (id: string, name: string) => {
  const data = {
    name,
  };
  return PATCH(`/publishers/${id}`, data);
};

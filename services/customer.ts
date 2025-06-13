import { Customer } from "@/types/customer";
import { GET, PATCH, POST } from "./utils";
import { GenerateId } from "@/utils/gen-id";

const convertCustomerResponse = (customer: any): Customer => {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email ?? "",
    phone: customer.phone,
    point: customer.point,
  };
};

export const GetCustomers = async () => {
  return GET("/customers/all").then((response) => {
    return response.data.map(convertCustomerResponse);
  });
};

export const CreateCustomer = async (customer: Customer) => {
  const data = {
    email: customer.email,
    id: GenerateId(),
    name: customer.name,
    phone: customer.phone,
  };
  return POST("/customers", data);
};

export const GetCustomerById = async (id: string) => {
  return GET(`/customers/${id}`).then((response) => {
    return convertCustomerResponse(response.data);
  });
};

export const UpdateCustomer = async (id: string, customer: Customer) => {
  const data = {
    email: customer.email,
    id,
    name: customer.name,
    phone: customer.phone,
  };
  return PATCH(`/customers/${id}`, data);
};

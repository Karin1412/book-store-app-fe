import Axios from "@/config/axios";
import { GET } from "./utils";
import { Role, User } from "@/types/user";

const convertUserResponse = (user: any): User => {
  // const data = {
  //   address: "TPHCM",
  //   email: "admin@gmail.com",
  //   id: "g3W21A7SR",
  //   img: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  //   isActive: true,
  //   name: "Nguyễn Văn A",
  //   phone: "1234567890",
  //   role: { features: [], id: "admin", name: "Admin" },
  // };

  return {
    id: user.id,
    name: user.name,
    email: user.email ?? "",
    phone: user.phone,
    address: user.address ?? "",
    imgUrl: "",
    role: user.role?.id || Role.USER,
    isActive: user.isActive ?? true,
    salt: user.salt ?? "",
  };
};

export const Login = (email: string, password: string) => {
  const data = {
    email,
    password,
  };

  return Axios.post("/login", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Login error:", error.message);
      throw error;
    })
    .finally(() => {
      console.log("Login request completed");
    });
};

export const GetProfile = async (token: string = "") => {
  if (token) {
    Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return GET("/profile").then((response) => {
    return convertUserResponse(response.data);
  });
};

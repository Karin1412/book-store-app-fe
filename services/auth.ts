import Axios from "@/config/axios";

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

export const GetProfile = async (token: string) => {
  return Axios.get("/profile", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.data);
};

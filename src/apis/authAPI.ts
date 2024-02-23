import instance from "@/utils/axiosCustomize";
import { object } from "prop-types";

interface User {
  firstname: string;
  username: string;
  lastname: string;
  password: string;
  DoB: string;
  role: string;
}
export const callRegister = (
  firstname: string,
  username: string,
  lastname: string,
  password: string,
  DoB: string,
  role: string,
  email: string
) => {
  const req = {
    firstName: firstname,
    username: username,
    lastName: lastname,
    password: password,
    dateOfBirth: DoB,
    role: role,
    email: email,
  };
  console.log(">>>check req: ", req);
  return instance.post("/register", req);
};

export const callLogin = (username: string, password: string) => {
  const req = {
    username: username,
    password: password,
  };
  return instance.post("/login", req);
};

export const testApi = () => {
  return instance.get("/hello");
};

export const callVerifyEmail = (verificationCode: String | null) => {
  return instance.get(`/verify-email?code=${verificationCode}`);
};

export const callSendVerifyEmail = () => {
  instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("verifyToken")}`,
  };
  return instance.get("/send-verification-email");
};

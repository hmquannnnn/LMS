import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const instance = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx cause this function to trigger
    // Do something with response data
    if (window.location.href.includes("/register")) {
      localStorage.setItem("verifyToken", response?.data?.token);
      window.location.href = "/verify-your-email";
    }

    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.status === 409) {
      //
      if (window.location.href.includes("/login")) {
        localStorage.setItem("verifyToken", error?.response?.data?.token);
      }
      console.log(">>>Có lỗi", error?.response?.data);
      setTimeout((window.location.href = "/verify-your-email"), 2000);

      return error;
    }
    console.log(">>>Có lỗi", error);
    return error?.response?.data ?? Promise.reject(error);
  },
);

if (typeof window !== "undefined") {
  instance.defaults.headers.common = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };
}

export default instance;

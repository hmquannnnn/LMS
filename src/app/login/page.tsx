"use client";
import React from "react";
import Link from "next/link";
import paths from "@/app/paths";
import { callLogin } from "@/apis/authAPI";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "@/types/formInput";
import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "@/redux/slices/accountSlice";
import { useRouter } from "next/navigation";
import { message, notification } from "antd";
import instance from "@/utils/axiosCustomize";

const LogIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const accountInfo = useSelector((state) => state.account);
  // console.log("check redux: ", accountInfo);
  const { register, handleSubmit } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
  };
  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // console.log(formData);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    // await localStorage.clear();
    instance.defaults.headers.common = {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };
    const res = await callLogin(username, password);
    console.log(res);
    if (res?.id) {
      console.log(res);
      localStorage.setItem("token", res.token);
      console.log(localStorage.getItem("token"));
      instance.defaults.headers.common = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
      dispatch(doLoginAction(res));
      router.push("/");
      message.success("Log in successfully!");
    } else {
      if (res?.response?.status === 409) {
        notification.info({
          message: "Oops!",
          description: "Please verify your email",
          duration: 2,
        });
      } else {
        notification.error({
          message: "Failed",
          description: "Wrong username or password",
          duration: 2,
        });
      }
    }
  };

  return (
    <>
      {/*<div className={"bg-gray-500 min-w-full min-h-full"}>*/}
      <div className="m-auto w-5/6 lg:w-1/4 sm:w-1/2 shadow px-2 py-3 absolute top-1/4 right-1/2 translate-x-2/4 rounded">
        <p className={"text-center mb-4 text-3xl font-bold"}>Log in</p>
        <form className={"m-auto flex flex-col"} onSubmit={handleLogIn}>
          <input
            className={"border-[1px] pl-4 rounded py-1.5 mb-4"}
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            className={"border-[1px] pl-4 rounded py-1.5 mb-4"}
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            className={"bg-rose-100 rounded py-1.5 font-medium mb-4"}
            type="submit"
          >
            Log in
          </button>
        </form>
        {/*<form onSubmit={handleSubmit(onSubmit)}>*/}
        {/*    <input*/}
        {/*        className={"border-[1px] pl-3"}*/}
        {/*        {...register("firstName", {*/}
        {/*                required: true, minLength: 2, maxLength: 24 })}*/}
        {/*    />*/}
        {/*    <input {...register("lastName", { pattern: {value: /^[A-Za-z]+$/i, message: "invalid"} })} />*/}
        {/*    <input type="number" {...register("role", { min: 18, max: 99 })} />*/}
        {/*    <input type="submit" />*/}
        {/*</form>*/}
        <p>
          {"Don\'t have an account? "}
          <Link className={"text-blue-700"} href={paths.register}>
            Register
          </Link>
        </p>
      </div>
      {/*</div>*/}
    </>
  );
};

export default LogIn;

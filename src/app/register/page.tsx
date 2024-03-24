"use client";
import React, { useRef } from "react";
import Link from "next/link";
import paths from "@/app/paths";
import { callRegister } from "@/apis/authAPI";
import instance from "@/utils/axiosCustomize";
import { useRouter } from "next/navigation";
import { ROLE_STUDENT, ROLE_TEACHER } from "@/utils/constant";
import { DatePicker } from "antd";
import "@/app/globals.css";
// const baseURL: string = process.env.BACKEND_URL;
// console.log(baseURL);
const Register = () => {
  const router = useRouter();
  const dateOfBirth: Dayjs | null = useRef(null);

  const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // console.log(formData);
    const firstname = formData.get("firstName") as string;
    const username = formData.get("username") as string;
    const lastname = formData.get("lastName") as string;
    const password = formData.get("password") as string;
    const DoB = formData.get("dateOfBirth") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const gender = formData.get("gender") as string;
    instance.defaults.headers.common = {
      "Content-Type": "application/json",
    };
    const res = await callRegister(
      firstname,
      username,
      lastname,
      password,
      // DoB,
      dateOfBirth.current?.format("YYYY-MM-DD"),
      role,
      email,
      gender,
    );
    if (res?.id) {
      router.push(paths.sendVerificationEmail);
    }
    console.log(">>>check res: ", res);
  };

  return (
    <>
      <div className="m-auto w-5/6 lg:w-1/4 sm:w-1/2 shadow px-2 py-3 absolute top-[10%] right-1/2 translate-x-2/4 rounded">
        <p className={"text-center mb-4 text-3xl font-bold"}>ĐĂNG KÝ</p>
        <form className={"m-auto flex flex-col"} onSubmit={handleLogIn}>
          <label className="ml-2 mb-1">Tên</label>
          <input
            className={
              "border-[1px] pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin"
            }
            type="text"
            name="firstName"
            placeholder="Tên"
          />
          <label className="ml-2 mb-1">Họ và tên đệm</label>
          <input
            className={
              "border-[1px] pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin"
            }
            type="text"
            name="lastName"
            placeholder="Họ và tên đệm"
          />
          <label className="ml-2 mb-1">Tên tài khoản</label>
          <input
            className={
              "border-[1px] pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin"
            }
            type="text"
            name="username"
            placeholder="Tên tài khoản"
          />
          <label className="ml-2 mb-1">Email</label>
          <input
            className={
              "border-[1px] pl-4 rounded py-1.5 mb-4  placeholder:text-gray-500 placeholder:font-thin"
            }
            placeholder="Email"
            type={"email"}
            name={"email"}
          />
          {/* <input className={"border-[1px] pl-4 rounded py-1.5 mb-4"}
            type={"date"}
            name={"dateOfBirth"}
            placeholder="01/10/1990" /> */}
          <label className="ml-2 mb-1">Ngày sinh</label>
          <DatePicker
            className={
              "border-[1px] border-gray-200 pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin hover:outline-none border-gray-200"
            }
            placeholder="Date of Birth"
            onChange={(val) => {
              dateOfBirth.current = val;
              console.log(dateOfBirth.current);
              console.log(dateOfBirth.current?.format("YYYY-MM-DD"));
            }}
          />
          <label className="ml-2 mb-1">Mật khẩu</label>
          <input
            className={
              "border-[1px] pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin"
            }
            type="password"
            name="password"
            placeholder="Mật khẩu"
          />
          <div className={"pl-1 columns-3 mb-4"}>
            <p className={"ml-1"}>Vai trò</p>
            <div className={"w-full columns-2 flex flex-row items-center"}>
              <input
                type={"radio"}
                id={"student"}
                name={"role"}
                value={ROLE_STUDENT}
              />
              <label
                className="cursor-pointer ml-1"
                htmlFor="student"
                defaultChecked
              >
                Học sinh
              </label>
            </div>
            <div className={"w-full columns-2 flex flex-row items-center"}>
              <input
                type={"radio"}
                id={"teacher"}
                name={"role"}
                value={ROLE_TEACHER}
              />
              <label className="cursor-pointer ml-1" htmlFor="teacher">
                Giáo viên
              </label>
            </div>
          </div>
          <label className="ml-2 mb-1">Giới tính</label>
          <select
            name="gender"
            id="cars"
            className={
              "border-[1px]  pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin hover:outline-none border-gray-200"
            }
          >
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
            <option value="OTHER">Khác</option>
          </select>
          {/*<Select*/}
          {/*  // defaultValue="lucy"*/}
          {/*  // style={{ width: 120 }}*/}
          {/*  // onChange={handleChange}*/}

          {/*  options={[*/}
          {/*    { value: "MALE", label: "MALE" },*/}
          {/*    { value: "FEMALE", label: "MALE" },*/}
          {/*    { value: "OTHER", label: "OTHER" },*/}
          {/*  ]}*/}
          {/*/>*/}
          {/*<input*/}
          {/*  className={*/}
          {/*    "border-[1px] pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin"*/}
          {/*  }*/}
          {/*  type="password"*/}
          {/*  name="password"*/}
          {/*  placeholder="Password"*/}
          {/*/>*/}
          <button
            className={"bg-blue_9 rounded py-1.5 font-medium mb-4"}
            type="submit"
          >
            Đăng ký
          </button>
        </form>
        <p>
          Đã có tài khoản?{" "}
          <Link className="underline" href={paths.logIn}>
            Đăng nhập
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;

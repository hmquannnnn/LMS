"use client";
import React, {useRef} from "react";
import Link from "next/link";
import paths from "@/app/paths";
import {callRegister} from "@/apis/authAPI";
import instance from "@/utils/axiosCustomize";
import {useRouter} from "next/navigation";
import {ROLE_STUDENT, ROLE_TEACHER} from "@/utils/constant";
import {DatePicker} from "antd";
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
        <p className={"text-center mb-4 text-3xl font-bold"}>Register</p>
        <form className={"m-auto flex flex-col"} onSubmit={handleLogIn}>
          <label className="ml-2 mb-1">First Name</label>
          <input
            className={
              "border-[1px] pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin"
            }
            type="text"
            name="firstName"
            placeholder="First Name"
          />
          <label className="ml-2 mb-1">Last Name</label>
          <input
            className={
              "border-[1px] pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin"
            }
            type="text"
            name="lastName"
            placeholder="Last Name"
          />
          <label className="ml-2 mb-1">Username</label>
          <input
            className={
              "border-[1px] pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin"
            }
            type="text"
            name="username"
            placeholder="Username"
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
          <label className="ml-2 mb-1">Date of Birth</label>
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
          <label className="ml-2 mb-1">Password</label>
          <input
            className={
              "border-[1px] pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin"
            }
            type="password"
            name="password"
            placeholder="Password"
          />
          <div className={"pl-1 columns-3"}>
            <p className={"ml-1"}>Role</p>
            <div className={"w-1/4 columns-2"}>
              <input
                type={"radio"}
                id={"student"}
                name={"role"}
                value={ROLE_STUDENT}
              />
              <label
                className="cursor-pointer"
                htmlFor="student"
                defaultChecked
              >
                Student
              </label>
            </div>
            <div className={"w-1/4 columns-2"}>
              <input
                type={"radio"}
                id={"teacher"}
                name={"role"}
                value={ROLE_TEACHER}
              />
              <label className="cursor-pointer" htmlFor="teacher">
                Teacher
              </label>
            </div>
          </div>
          <label className="ml-2 mb-1">Gender</label>
          <select
            name="gender"
            id="cars"
            className={
              "border-[1px] border-gray-200 pl-4 rounded py-1.5 mb-4 placeholder:text-gray-500 placeholder:font-thin hover:outline-none border-gray-200"
            }
          >
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
            <option value="OTHER">OTHER</option>
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
            className={"bg-rose-100 rounded py-1.5 font-medium mb-4"}
            type="submit"
          >
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="underline" href={paths.logIn}>
            Log in
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;

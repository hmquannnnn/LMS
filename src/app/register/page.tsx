'use client';
import React from 'react';
import Link from "next/link";
import paths from "@/app/paths";
import {callRegister} from "@/apis/authAPI";
import instance from '@/utils/axiosCustomize';
import { useRouter } from 'next/navigation';
// const baseURL: string = process.env.BACKEND_URL;
// console.log(baseURL);
const Register = () => {
    const router = useRouter();

    const handleLogIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        // console.log(formData);
        const firstname = formData.get('firstName') as string;
        const username = formData.get('username') as string;
        const lastname = formData.get('lastName') as string;
        const password = formData.get('password') as string;
        const DoB = formData.get('dateOfBirth') as string;
        const role = formData.get('role') as string;
        instance.defaults.headers.common = {
            "Content-Type": "application/json",
        };
        const res = await callRegister(firstname, username, lastname, password, DoB, role);
        if(res?.id) {
            router.push(paths.logIn);
        }
        console.log(">>>check res: ", res);
    };

    return (
        <>
            <div
                className="m-auto w-5/6 lg:w-1/4 sm:w-1/2 shadow px-2 py-3 absolute top-1/4 right-1/2 translate-x-2/4 rounded">
                <p className={"text-center mb-4 text-3xl font-bold"}>Register</p>
                <form className={"m-auto flex flex-col"} onSubmit={handleLogIn}>
                    <input className={"border-[1px] pl-4 rounded py-1.5 mb-4"} type="text" name="firstName"
                           placeholder="First Name"/>
                    <input className={"border-[1px] pl-4 rounded py-1.5 mb-4"} type="text" name="lastName"
                           placeholder="Last Name"/>
                    <input className={"border-[1px] pl-4 rounded py-1.5 mb-4"} type="text" name="username"
                           placeholder="Username"/>
                    <input type={"date"} name={"dateOfBirth"}/>
                    <div className={"pl-1 columns-3"}>
                        <p>Role</p>
                        <div className={"w-1/4 columns-2"}>
                            <input type={"radio"} name={"role"} value={"ROLE_STUDENT"}/>
                            <label>Student</label>
                        </div>
                        <div className={"w-1/4 columns-2"}>
                            <input type={"radio"} name={"role"} value={"ROLE_TEACHER"}/>
                            <label>Teacher</label>
                        </div>
                    </div>


                    <input className={"border-[1px] pl-4 rounded py-1.5 mb-4"} type="password" name="password"
                           placeholder="Password"/>
                    <button className={"bg-rose-100 rounded py-1.5 font-medium mb-4"} type="submit">Register</button>
                </form>
                <p>Already have an account? <Link href={paths.logIn}>Log in</Link></p>
            </div>
        </>
    );
};

export default Register;

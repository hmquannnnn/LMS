'use client';
import React from 'react';
import Link from "next/link";
import paths from "@/app/paths";
import {callRegister} from "@/apis/userAPI";
// const baseURL: string = process.env.BACKEND_URL;
// console.log(baseURL);
const Register = () => {
    const handleLogIn = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        // console.log(formData);
        const firstname = formData.get('firstName') as string;
        const username = formData.get('username') as string;
        const lastname = formData.get('lastName') as string;
        const password = formData.get('password') as string;
        const DoB = formData.get('dateOfBirth') as string;
        const role = formData.get('role') as string;

        const res = await callRegister(firstname, username, lastname, password, DoB, role);
        console.log(">>>check res: ", res);
    };

    return (
        <>
            <div className="max-w-screen-xl m-auto">
                <p className={"text-center"}>Register</p>
                <form className={"m-auto"} onSubmit={handleLogIn}>
                    <input type="text" name="firstName" placeholder="First Name" />
                    <input type="text" name="lastName" placeholder="Last Name" />
                    <input type="text" name="username" placeholder="Username" />
                    <input type={"date"} name={"dateOfBirth"}/>
                    <input type={"radio"} name={"role"} value={"ROLE_STUDENT"}/>
                    <label>Student</label>
                    <input type={"radio"} name={"role"} value={"ROLE_TEACHER"}/>
                    <label>Teacher</label>
                    <input type="password" name="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <Link href={paths.logIn}>Log in</Link></p>
            </div>
        </>
    );
};

export default Register;

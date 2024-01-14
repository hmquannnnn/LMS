'use client';
import React from 'react';
import Link from "next/link";
import paths from "@/app/paths";
import {callLogin, testApi} from "@/apis/userAPI";

const LogIn = () => {
    const handleLogIn = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        console.log(formData);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        // const res = await callLogin(username, password);
        const res = await callLogin(username, password);
        console.log(res);

    };

    return (
        <>
            <div className="m-auto w-fit shadow px-2 py-3 absolute top-1/4 right-1/2 translate-x-2/4">
                <p className={"text-center"}>Login</p>
                <form className={"m-auto flex flex-col"} onSubmit={handleLogIn}>

                        <input className={"border-[1px]"} type="text" name="username" placeholder="Username" />
                        <input type="password" name="password" placeholder="Password" style={{border: "1px solid black"}} />
                        <button className={"bg-rose-100"} type="submit">Login</button>


                </form>
                <p>Don't have an account? <Link href={paths.register}>Register</Link></p>
            </div>
        </>
    );
};

export default LogIn;

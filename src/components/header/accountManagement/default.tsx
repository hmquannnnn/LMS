"use client"

import paths from "@/app/paths";
import Link from "next/link";

const DefaultDropdown = () => {
    return (
        <>
            <p className={"text-white font-semibold decoration-white text-lg hover:text-white "}>
                <Link className="border border-transparent rounded-lg hover:border-white px-1 py-1" href={paths.logIn}>Đăng nhập</Link>
                |
                <Link className="border border-transparent rounded-lg hover:border-white px-1 py-1" href={paths.register}>Đăng ký</Link>
            </p>

        </>
    )
}

export default DefaultDropdown;
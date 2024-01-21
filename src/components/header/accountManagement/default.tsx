"use client"

import paths from "@/app/paths";
import Link from "next/link";

const DefaultDropdown = () => {
    return (
        <>
            <p className={"text-white font-semibold decoration-white text-lg hover:text-white"}>
                <Link href={paths.logIn}>Đăng nhập {" "}</Link>
                | 
                <Link href={paths.register}>{" "} Đăng ký</Link>
            </p>

        </>
    )
}

export default DefaultDropdown;
"use client"

import paths from "@/app/paths";
import Link from "next/link";

const DefaultDropdown = () => {
    return (
        <>
            <div className={"font-semibold decoration-white text-lg py-2 px-6 bg-purple_3 text-white rounded-lg"}>
                <Link className="border border-transparent rounded-lg hover:border-white px-1 py-1 " href={paths.logIn}>Đăng nhập</Link>
                {/* <Link className="border border-transparent rounded-lg hover:border-white px-1 py-1" href={paths.register}>Đăng ký</Link> */}
            </div>

        </>
    )
}

export default DefaultDropdown;
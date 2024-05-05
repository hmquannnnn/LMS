"use client";

import { useEffect, useState } from "react";
import { callVerifyEmail } from "@/apis/authAPI";
import { useRouter, useSearchParams } from "next/navigation";
import { Spin } from "antd";

const VerifyEmailPage = () => {
    const searchParams = useSearchParams();
    const code: String | null = searchParams.get("code");
    const [isVerify, setIsVerify] = useState(false);
    const router = useRouter();
    const verifyEmail = async () => {
        const res = await callVerifyEmail(code);
        if (res.status === "ok") {
            router.push("/login");
            setIsVerify(true);
        }
    };
    useEffect(() => {
        verifyEmail();
    }, []);

    return (
        <div className="w-full h-[100vh] flex flex-col gap-5 items-center justify-center mix-blend-hard-light bg">
            {!isVerify && (
                <>
                    <div>
                        <Spin />
                    </div>
                    <div className="w-fit text-2xl">Đang xác thực email của bạn...</div>
                </>
            )}
            {isVerify && (
                <>
                    <div className="w-fit text-2xl">
                        Đã xãc thực thành công email của bạn. Đang chuyển hướng về trang đăng nhập. <Spin />
                    </div>
                </>
            )}
        </div>
    );
};
export default VerifyEmailPage;

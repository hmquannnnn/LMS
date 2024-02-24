'use client';

import { useEffect, useState } from 'react';
import { callVerifyEmail } from '@/apis/authAPI';
import { useSearchParams, useRouter } from 'next/navigation';
import { Spin } from 'antd';

const VerifyEmailPage = () => {
    const searchParams = useSearchParams();
    const code: String | null = searchParams.get('code');
    const [isVerify, setIsVerify] = useState(false);
    const router = useRouter();

    useEffect(() => {
        callVerifyEmail(code).then((res) => {
            console.log(res)
        }).then((res) => {
            if (res.status == 'ok') {
                router.push('/login')
                setIsVerify(true)
            }
        }).catch;
    }, []);

    return (
        <div className='w-full h-[100vh] flex flex-col gap-5 items-center justify-center'>
            {
                !isVerify &&
                <>
                    <div>
                        <Spin />
                    </div>
                    <div className='w-fit text-2xl'>Đang xác thực email của bạn...</div>
                </>
            }
            {
                isVerify &&
                <>
                    <div className='w-fit text-2xl'>Đã xãc thực thành công email của bạn.</div>
                </>
            }


        </div>
    )

}
export default VerifyEmailPage;
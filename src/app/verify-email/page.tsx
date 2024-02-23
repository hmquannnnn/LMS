'use client';

import { useEffect } from 'react';
import { callVerifyEmail } from '@/apis/authAPI';
import { useSearchParams } from 'next/navigation';


const VerifyEmailPage = () => {
    const searchParams = useSearchParams();
    const code: String | null = searchParams.get('code');

    useEffect(() => {
        callVerifyEmail(code).then((res) => {
            console.log(res)
        });
    }, []);

    return (
        <div>Verifying email...</div>

    )

}
export default VerifyEmailPage;
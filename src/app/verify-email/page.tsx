'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { callVerifyEmail } from '@/apis/authAPI';

const VerifyEmailPage = () => {
    const searchParams = useSearchParams();
    const code: String | null = searchParams.get('code');

    useEffect(() => {
        callVerifyEmail(code).then((res) => {
            console.log(res)
        });
    }, []);

    return <div>Verifying email...</div>;
}
export default VerifyEmailPage;
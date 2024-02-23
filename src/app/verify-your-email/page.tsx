'use client';
import { useSearchParams } from 'next/navigation'
import { callSendVerifyEmail } from '@/apis/authAPI';
const VerifyYourMailPage = () => {
    const searchParams = useSearchParams()

    const email = searchParams.get('email')

    return (
        <div>
            <h1>Verify your mail</h1>
            <button onClick={() => console.log(callSendVerifyEmail(email))}>Send verify mail</button>
            <p>
                We have sent you a mail. Please verify your mail by clicking on the link
                in the mail.
            </p>
        </div>
    );
}

export default VerifyYourMailPage;
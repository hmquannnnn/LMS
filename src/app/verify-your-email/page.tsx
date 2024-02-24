'use client';
import { callSendVerifyEmail } from '@/apis/authAPI';
const VerifyYourMailPage = () => {


    return (
        <div>
            <h1>Verify your mail</h1>
            <button className='' onClick={() => console.log(callSendVerifyEmail())}>Send verify mail</button>
            <p>
                We have sent you a mail. Please verify your mail by clicking on the link
                in the mail.
            </p>
        </div>
    );
}

export default VerifyYourMailPage;
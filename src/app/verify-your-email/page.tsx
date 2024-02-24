"use client";
import { callSendVerifyEmail } from "@/apis/authAPI";
import { useState } from "react";

const VerifyYourMailPage = () => {
  const [isSent, setIsSent] = useState(false);
  // console.log(isSent);
  const sendMailVerification = async () => {
    const res = await callSendVerifyEmail();
    console.log(">>>check verification: ", res);
    if (isSent === false) {
      setIsSent(true);
    }
  };

  return (
    <div className={"w-full h-[100vh] bg-blue_1"}>
      <div
        className={"w-1/4 h-fit absolute border-[1px] p-5 rounded-xl bg-white"}
        style={{ top: "20%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <h1 className={"text-center font-bold text-2xl mb-10"}>
          Verify your mail
        </h1>
        <button
          className={
            "bg-blue_1 text-blue_5 py-1 px-6 font-medium text-lg rounded mx-auto block mb-5 hover:shadow-xl"
          }
          onClick={() => sendMailVerification()}
        >
          Send mail verification
        </button>

        <p className={"text-center"}>
          {isSent
            ? "We have sent you a mail. Please verify your mail by clicking on the link in the mail."
            : "Bấm nút để gửi mail xác nhận"}
        </p>
      </div>
    </div>
  );
};

export default VerifyYourMailPage;

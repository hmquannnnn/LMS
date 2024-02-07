"use client";

import { callFetchUser } from "@/apis/userAPI";
import { doGetAccountAction } from "@/redux/slices/accountSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState("");
  const user = useSelector((state) => state.account.user);
  const getAccount = async () => {
    const res = await callFetchUser();
    if (res?.id) {
      dispatch(doGetAccountAction(res));
    }
  };
  useEffect(() => {
    getAccount();
  }, []);

  return (
    <>
      <img src={`${process.env.BACKEND_URL}`} />
      <div className={"min-h-[80vh]"}>homepage</div>
    </>
  );
}

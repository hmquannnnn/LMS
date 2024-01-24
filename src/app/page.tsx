"use client"

import { callFetchUser } from "@/apis/userAPI";
import { doGetAccountAction } from "@/redux/slices/accountSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
    const dispatch = useDispatch();
    const getAccount = async () => {
        const res = await callFetchUser();
        if (res?.id) {
            dispatch(doGetAccountAction(res));
        }
    }
    useEffect(() => {
        getAccount();
    }, []);
    const user = useSelector(state => state.account.user);
    console.log("account: ", user);
    return (
        <>
            <div className={"min-h-[80vh]"}>
                homepage
            </div>

        </>
    )
}

"use client"

import { getMedia } from "@/apis/mediaAPI";
import { callFetchUser } from "@/apis/userAPI";
import { doGetAccountAction } from "@/redux/slices/accountSlice";
import instance from "@/utils/axiosCustomize";
import { readFile } from "node:fs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Home() {
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState("");
    const user = useSelector(state => state.account.user);
    const getAccount = async () => {
        const res = await callFetchUser();
        if (res?.id) {
            dispatch(doGetAccountAction(res));
            const imgBinary = await getMedia(res.avatarId);
            setAvatar(imgBinary);
            // const fs = module.constructor._load('fs');
            // console.log(fs.readFileSync(imgBinary));
        }
    }
    useEffect(() => {
        getAccount();
    }, []);
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
    // console.log("account: ", user);
    return (
        <>
            <img src={`${process.env.BACKEND_URL}`} />
            <div className={"min-h-[80vh]"}>
                homepage
            </div>

        </>
    )
}

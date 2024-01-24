"use client"
import paths from "@/app/paths";
import { useRouter } from "next/navigation";
import {useSelector} from "react-redux";

const LoggedInDropdown = () => {
    const router = useRouter();
    const user = useSelector(state => state.account.user);
    return (
        <>
            <p className={"text-white font-semibold decoration-white text-lg"} onClick={() => router.push(paths.profile)}>Hello, {user.username}</p>
        </>
    )
}

export default LoggedInDropdown;
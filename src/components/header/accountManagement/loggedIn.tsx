"use client"
import {useSelector} from "react-redux";

const LoggedInDropdown = () => {
    const user = useSelector(state => state.account.user);
    return (
        <>
            <p className={"text-white font-semibold decoration-white text-lg"}>Hello, {user.username}</p>
        </>
    )
}

export default LoggedInDropdown;
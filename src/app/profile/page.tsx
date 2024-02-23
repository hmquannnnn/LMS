'use client'
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector(state => state.account.user);
    return (
        <>
            <div className="min-h-[82vh]">

            </div>
        </>
    )
}

export default Profile;
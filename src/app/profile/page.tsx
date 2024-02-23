"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import Avatar from "react-avatar-edit";
import Cropper from "@/components/Cropper";

const Profile = () => {
    // const user = useSelector((state) => state.account.user);
    // const [src, setSrc] = useState(null);
    // const [preview, setPreview] = useState(null);

    // const onClose = () => {
    //     setPreview(null);
    // };

    // const onCrop = (view) => {
    //     setPreview(view);
    // };

    // return (
    //     <>
    //         <div className="min-h-[82vh]">
    //             {user.id}
    //             <Avatar
    //                 width={400}
    //                 height={400}
    //                 onClose={onClose}
    //                 onCrop={onCrop}
    //                 src={src}
    //             />
    //             <img src={preview} />
    //             <Cropper />
    //         </div>
    //     </>
    // );

    return <></>
};

export default Profile;

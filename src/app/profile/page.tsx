"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserInfo from "@/components/userInfo";
import { ROLE_STUDENT } from "@/utils/constant";
import Cropper from "@/components/Cropper";

const Profile = () => {
  const user = useSelector((state) => state.account.user);
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    setIsRendered(true);
  }, []);
  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${user.avatarId}`);

  return (
    <>
      <div className="min-h-[82vh] grid grid-cols-12">
        {/*{user.id}*/}
        {/*<Cropper />*/}
        <div className={"col-span-3"}></div>
        <div className={"col-span-9"}>
          <h3>My profile</h3>
          <div className={"grid grid-cols-3"}>
            <div className={"col-span-2"}>
              <UserInfo
                label={"Name: "}
                value={user.lastName + " " + user.firstName}
              />
              <UserInfo label={"Email: "} value={user.email} />
              <UserInfo label={"Username: "} value={user.username} />
              <UserInfo label={"Date of birth: "} value={user.dateOfBirth} />
              <UserInfo label={"Gender: "} value={user.gender} />
              <UserInfo
                label={"Role: "}
                value={user.role === ROLE_STUDENT ? "Student" : "Teacher"}
              />
            </div>
            <div className={"col-span-1"}>
              <Cropper
                imgSrc={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${user.avatarId}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

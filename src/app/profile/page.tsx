"use client";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserInfo from "@/components/userInfo";
import { ROLE_STUDENT } from "@/utils/constant";
import Cropper from "@/components/Cropper";
import "./profile.scss";

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
      <div
        className="min-h-[95vh] grid grid-cols-12 h-fit"
        style={{ backgroundImage: "url(/sky.png)" }}
      >
        {/*{user.id}*/}
        {/*<Cropper />*/}
        <div className={"col-span-3"}></div>
        <div className={"col-span-9 pr-10 h-fit"}>
          <h3 className={"font-bold text-2xl"}>My profile</h3>
          <div className={"grid " + "grid-cols-5 " + "mt-3 profile-user"}>
            <div className={"" + "col-span-3 " + "user-info"}>
              <UserInfo
                label={"Name: "}
                value={user.lastName + " " + user.firstName}
              />
              <UserInfo label={"Email: "} value={user.email} />
              <UserInfo label={"Username: "} value={user.username} />
              <UserInfo
                label={"Date of birth: "}
                value={user.dateOfBirth.split("").reverse().join("")}
              />
              <UserInfo label={"Gender: "} value={user.gender} />
              <UserInfo
                label={"Role: "}
                value={user.role === ROLE_STUDENT ? "Student" : "Teacher"}
              />
            </div>
            <div className={"" + "col-span-2 " + "user-avatar"}>
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

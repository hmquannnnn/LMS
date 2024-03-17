"use client";

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import UserInfo from "@/components/userInfo";
import {ROLE_STUDENT} from "@/utils/constant";
import Cropper from "@/components/Cropper";
import {callGetPageFavoriteDocuments} from "@/apis/userAPI";
import {formatDocumentTitle} from "@/app/library/[documentId]/page";
// import "./profile.scss";

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

  // console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${user.avatarId}`);
  const [favoriteDocuments, setFavoriteDocuments] = useState();
  const fetchFavoriteData = async (userId: String) => {
    try {
      let response = await callGetPageFavoriteDocuments(userId, 0, 5);
      setFavoriteDocuments(response);
      console.log(favoriteDocuments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    if (user?.id != "0") {
      fetchFavoriteData(user?.id);
    }
  }, [user]);
  return (
    <div className={"block mx-auto w-[90%]"}>
      <h3 className={"font-bold text-2xl text-blue_8"}>Personal Information</h3>
      <div className={"bg-blue_8 h-[1px] my-3 w-[70%]"} />
      <div
        className="min-h-[85vh] grid grid-cols-12 h-fit"
        // style={{ backgroundImage: "url(/sky.png)" }}
      >
        {/*{user.id}*/}
        {/*<Cropper />*/}

        <div className="col-span-3 flex flex-col h-full gap-10 pr-10">
          {/* bg-gradient-to-br from-pink_1 to-yellow_1 */}
          {/* <div className="h-40 border-2  rounded-xl "></div> */}
          <div className="h-full rounded pl-4 pt-4 pr-6 bg-blue_1">
            <svg
              aria-label="Unlike"
              className="x1lliihq x1n2onr6 xxk16z8 inline mr-1 fill-blue_5 cursor-pointer"
              fill=""
              height="18"
              role="img"
              viewBox="0 0 48 48"
              width="18"
            >
              <title>Unlike</title>
              <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
            </svg>
            <span className="font-headingText text-blue_5 mb-3 inline-block cursor-pointer font-semibold">
              Danh sách yêu thích
            </span>

            <ul className="pl-2">
              {favoriteDocuments &&
                favoriteDocuments.data.map((document, index) => {
                  return (
                    <li
                      key={document.id}
                      className="hover:text-blue_5 line-clamp-2 text-[0.9rem] mb-2 cursor-pointer"
                      onClick={() => {
                        router.push(`/library/${document.id}`);
                      }}
                    >
                      {index + 1 + "."} {formatDocumentTitle(document.title)}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className={"col-span-9 h-fit h-full"}>
          <div className={"grid grid-cols-5 profile-user h-full"}>
            <div
              className={
                "col-span-3 user-info h-full bg-blue_6 rounded-l rounded-tr px-5"
              }
            >
              <h2 className={"text-blue_8 font-bold text-2xl mt-5"}>
                MY PROFILE
              </h2>
              <div className={"pl-5"}>
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
            </div>
            <div
              className={" col-span-2 user-avatar"}
              style={{
                display: "grid",
                gridTemplateRows: "40% 60%",
                // gap: "calc((100% - (70% + 12% + 12%)) / 2)",
              }}
            >
              <div className={"pl-5 pb-5"}>
                <Cropper
                  imgSrc={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/${user.avatarId}`}
                />
              </div>

              <div className={"rounded-r bg-blue_6"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

"use client";

import type { MenuProps } from "antd";
import { Popover } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import LoggedInDropdown from "@/components/header/accountManagement/loggedIn";
import DefaultDropdown from "@/components/header/accountManagement/default";
import { usePathname, useRouter } from "next/navigation";
import { callFetchUser } from "@/apis/userAPI";
import { doGetAccountAction } from "@/redux/slices/accountSlice";
import Image from "next/image";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Kinh tế
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Văn hóa
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Xã hội
      </a>
    ),
  },
];

const Header = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  // console.log(isAuthenticated);
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const getAccount = async () => {
    const res = await callFetchUser();
    if (res?.id) {
      dispatch(doGetAccountAction(res));
    }
  };
  useEffect(() => {
    getAccount();
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showTopics = (
    <div className="">
      <div className="flex gap-4">
        <Link
          href={"/library/topics/culture"}
          className={"text-lg flex group group-hover:text-purple_1"}
        >
          {/* <div className='h-full w-[1px] mr-2 my-[2px] bg-black group-hover:bg-purple_1'></div> */}
          Văn hóa
        </Link>
        <Link
          href={"/library/topics/sport"}
          className={"text-lg flex group group-hover:text-purple_1"}
        >
          <div className="h-full w-[1px] mr-2 my-[2px] bg-black group-hover:bg-purple_1"></div>
          Thể thao
        </Link>
        <Link
          href={"/library/topics/social"}
          className={"text-lg flex group group-hover:text-purple_1"}
        >
          <div className="h-full w-[1px] mr-2 my-[2px] bg-black group-hover:bg-purple_1"></div>
          Xã hội
        </Link>
        <Link
          href={"/library/topics/tourism"}
          className={"text-lg flex group group-hover:text-purple_1"}
        >
          <div className="h-full w-[1px] mr-2 my-[2px] bg-black group-hover:bg-purple_1"></div>
          Du lịch
        </Link>
      </div>
    </div>
  );

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <div
        className={"sticky top-0 py-4 flex justify-center"}
        style={{ zIndex: "500" }}
      >
        <div className="w-1/6 flex items-center justify-center">
          <Link href={"/library"}>
            <Image
              className={""}
              src="/images/logo.png"
              width={80}
              height={40}
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex flex-auto items-center justify-between w-2/3">
          <div className={"h-fit my-auto flex-1"}>
            <div className="flex items-center">
              {/*<Dropdown className={"my-auto"} menu={{items}}>*/}
              {/* <button
                            className={"border-[1px] text-center border-white text-white font-semibold h-8 rounded my-auto px-2 text-lg"}
                            // onClick={(e) => e.preventDefault()}
                            onClick={
                                // showDrawer
                                () => {
                                    router.push("/library/topics");
                                }
                            }
                        >
                        </button> */}
              <Popover placement="bottom" content={showTopics}>
                <div className="flex items-center cursor-pointer">
                  {/* <GiHamburgerMenu className={"mr-2.5 text-xl my-auto"} /> */}
                  <p className={"text-purple_1 font-bold"}>DANH MỤC</p>
                </div>
              </Popover>

              {/* <Drawer title="Basic Drawer" placement={"left"} onClose={onClose} open={open}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Drawer> */}
              {/*</Dropdown>*/}
              <div className="bg-purple_2 flex items-center px-2 border rounded-lg ml-[3vh] w-2/3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 30 30"
                  fill="white"
                >
                  <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
                </svg>
                <input
                  className={
                    "h-8 rounded border-0 bg-purple_2  caret-white focus:outline-none border-gray-200 pl-2 my-auto ml-2 outline-none "
                  }
                  type={"text"}
                  placeholder={""}
                />
              </div>
            </div>
          </div>
          <div className={"h-fit my-auto flex justify-end gap-5 items-center"}>
            {pathName.includes("/library") ? (
              <Link
                href={"/my-classes"}
                className={
                  "font-semibold border border-transparent rounded-lg px-4 py-1 text-lg text-purple_1"
                }
              >
                Lớp học
              </Link>
            ) : (
              <Link
                href={"/library"}
                className={
                  "font-semibold decoration-white border border-transparent rounded-lg hover:border-white px-4 py-1 text-lg text-purple_1"
                }
              >
                Thư viện
              </Link>
            )}
            {/*<Link href={"/profile"} className={"font-semibold text-lg"}>Profile</Link>*/}
            {isAuthenticated ? <LoggedInDropdown /> : <DefaultDropdown />}
          </div>
        </div>
        <div className="w-1/6 flex-1"></div>
      </div>
    </>
  );
};

export default Header;

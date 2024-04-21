"use client";

import type { MenuProps } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import LoggedInDropdown from "@/components/header/accountManagement/loggedIn";
import DefaultDropdown from "@/components/header/accountManagement/default";
import { usePathname, useRouter } from "next/navigation";
import { callFetchUser } from "@/apis/userAPI";
import { doGetAccountAction } from "@/redux/slices/accountSlice";
import Image from 'next/image';
import { Popover, Dropdown } from 'antd';
import { set } from 'react-hook-form';
import { callSearchDocumentByTitle } from '@/apis/documentsAPI';



const topicMapping = {
  "POLITICS": "Chính trị",
  "ECONOMY": "Kinh tế",
  "EDUCATION": "Giáo dục",
  "LAW": "Pháp luật",
  "MEDICAL": "Y tế",
  "CULTURE": "Văn hóa",
  "SPORT": "Thể thao",
  "LIFE_ENTERTAINMENT": "Đời sống - Giải trí",
  "SCIENCE_TECHNOLOGY": "Khoa học - Công nghệ",
  "ENVIRONMENT": "Môi trường",
}

const listTopics = [
  "POLITICS",
  "ECONOMY",
  "EDUCATION",
  "LAW",
  "MEDICAL",
  "CULTURE",
  "SPORT",
  "LIFE_ENTERTAINMENT",
  "SCIENCE_TECHNOLOGY",
  "ENVIRONMENT",
]



const Header = () => {
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);
  const [isTypingSearch, setIsTypingSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [searchItems, setSearchItems] = useState<MenuProps["items"]>([]);
  const [searchResult, setSearchResult] = useState([] as any[]);
  const [searchValue, setSearchValue] = useState("");
  const [menuActive, setMenuActive] = useState(false);
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const getAccount = async () => {
    const res = await callFetchUser();
    if (res?.id) {
      dispatch(doGetAccountAction(res));
    }
  }
  useEffect(() => {
    getAccount();
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [count, setCount] = useState(0);


  const showTopics = (
    <div className="">
      <div className="flex gap-4">
        {listTopics.map((topic, index) => {
          return (
            <Link
              key={index}
              href={`/library/topics/${topic.toLowerCase()}`}
              className={"text-lg flex group group-hover:text-purple_1"}
            >
              <div className="h-full w-[1px] mr-2 my-[2px] bg-black group-hover:bg-purple_1"></div>
              {topicMapping[topic]}
            </Link>
          )
        }
        )}
      </div>
    </div>
  );

  useEffect(() => {
    setIsLoggedIn(isAuthenticated);
  }, [isAuthenticated]);

  // const searchItems: MenuProps["items"] = [
  // ];

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const response = await callSearchDocumentByTitle(searchValue);
      setSearchItems(response.map((item, index) => {
        return {
          key: item.id,
          label: (
            <Link href={`/library/${item.id}`}>
              <p>{item.title}</p>
            </Link>
          )
        }
      }).filter((item, index) => index < 5));
      setIsTypingSearch(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId)
    };
  }, [searchValue]);

  const handleOnChangeSearch = (event) => {
    setIsTypingSearch(true);
    setSearchValue(event.target.value);
  }

  return (
    <>
      <div
        className={"sticky top-0 py-4 flex justify-center"}
        style={{ zIndex: "500" }}
        onMouseLeave={() => setMenuActive(false)}
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
            <div className="flex items-center relative cursor-pointer" onMouseEnter={() => setMenuActive(true)}>

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
              {/* <Dropdown menu={{
                                items: [
                                    {
                                        key: 1,
                                        label: (
                                            <div className="flex  flex-wrap">
                                                {
                                                    listTopics.map((topic, index) => {
                                                        return (
                                                            <div key={index}>
                                                                {index != 0 &&
                                                                    <div className={`h-full w-[1px] ml-2 mr-2 my-[2px] bg-black `}></div>
                                                                }
                                                                <Link
                                                                    key={index}
                                                                    href={`/library/topics/${topic.toLowerCase()}`}
                                                                >
                                                                    <div className={`text-lg text-nowrap items-center flex group${index} group${index}-hover:text-purple_1 h-[4vh]  hover:border-y border-purple_1  hover:`}>
                                                                        {topicMapping[topic]}
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                ]
                            }}> */}

              <div className="flex items-center cursor-pointer">
                {/* <GiHamburgerMenu className={"mr-2.5 text-xl my-auto"} /> */}
                <p className={"text-purple_1 font-bold"}>DANH MỤC</p>
              </div>
              {/* </Dropdown> */}
              {/* <Popover placement="bottom" content={showTopics}>
                            </Popover> */}

              {/* <Drawer title="Basic Drawer" placement={"left"} onClose={onClose} open={open}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Drawer> */}
              {/*</Dropdown>*/}
              <Dropdown className={""} menu={{ items: searchItems }} trigger={['click']} placement="top">
                <div className="bg-purple_2 flex items-center px-2 border rounded-lg ml-[3vh] w-2/3">
                  {
                    isTypingSearch ?
                      <div className=''>
                        <svg aria-hidden="true" className="w-[24px] h-[24px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div> :
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
                  }

                  <input
                    className={
                      "flex-1 text-white font-bold h-8 rounded border-0 bg-purple_2  caret-white focus:outline-none border-gray-200 pl-2 my-auto ml-2 outline-none "
                    }
                    onChange={handleOnChangeSearch}
                    value={searchValue}
                    type={"text"}
                    placeholder={""}
                  />
                </div>
              </Dropdown>
            </div>
          </div>
          <div className={"h-fit my-auto flex justify-end gap-5 items-center"}>
            <Link
              href={"/my-classes"}
              className={
                "font-semibold border border-transparent rounded-lg px-4 py-1 text-lg text-purple_1"
              }
            >
              Lớp học
            </Link>
            {/* {pathName.includes("/library") ? (
                        ) : (
                            <Link
                                href={"/library"}
                                className={
                                    "font-semibold decoration-white border border-transparent rounded-lg hover:border-white px-4 py-1 text-lg text-purple_1"
                                }
                            >
                                Thư viện
                            </Link>
                        )} */}
            {/*<Link href={"/profile"} className={"font-semibold text-lg"}>Profile</Link>*/}
            {isAuthenticated ? <LoggedInDropdown /> : <DefaultDropdown />}
          </div>
        </div>
        <div className="w-1/6 flex-1"></div>
        {
          menuActive &&
          <div className="flex absolute w-full bottom-[-32px] left-0 z-[10] justify-center gap-5 bg-white shadow-lg py-2 ">
            {
              listTopics.map((topic, index) => {
                return (
                  <div className="flex" key={index}>
                    {/* {index != 0 &&
                                        <div className={`h-full w-[1px] ml-2 mr-2 my-[2px] bg-black `}></div>
                                    } */}
                    <Link
                      key={index}
                      href={`/library/topics/${topic.toLowerCase()}`}
                    >
                      <div className={`text-sm text-nowrap items-center flex group${index} group${index}-hover:text-purple_1 h-[4vh]  hover:border-y border-purple_1 `}>
                        {topicMapping[topic]}
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div >
        }

      </div >
    </>
  );
};

export default Header;

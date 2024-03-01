'use client'

import type { MenuProps } from 'antd';
import { Col, Drawer, Row } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./header.scss"
import { useDispatch, useSelector } from "react-redux";
import LoggedInDropdown from "@/components/header/accountManagement/loggedIn";
import DefaultDropdown from "@/components/header/accountManagement/default";
import { useRouter } from "next/navigation";
import { callFetchUser } from "@/apis/userAPI";
import { doGetAccountAction } from "@/redux/slices/accountSlice";

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Kinh tế
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Văn hóa
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Xã hội
            </a>
        ),
    },
];

const Header = () => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
    // console.log(isAuthenticated);
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

    useEffect(() => {
        setIsLoggedIn(isAuthenticated);
    }, [isAuthenticated]);

    return (
        <>
            <div className={"sticky top-0 bg-[#b8e6f6] flex items-center justify-between h-12 px-3 w-full"} style={{ zIndex: "1000" }}>
                <div className={"h-fit my-auto w-1/2"}>
                    <div className='flex items-center '>
                        {/*<Dropdown className={"my-auto"} menu={{items}}>*/}
                        <button
                            className={"border-[1px] text-center border-white text-white font-semibold h-8 rounded my-auto px-2 text-lg"}
                            // onClick={(e) => e.preventDefault()}
                            onClick={
                                // showDrawer
                                () => {
                                    router.push("/library/topics");
                                }
                            }
                        >
                            <div className='flex'>
                                <GiHamburgerMenu className={"mr-2.5 text-xl my-auto"} />
                                <p className={"text-lg"}>Topic</p>
                            </div>
                        </button>
                        {/* <Drawer title="Basic Drawer" placement={"left"} onClose={onClose} open={open}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Drawer> */}
                        {/*</Dropdown>*/}
                        <input
                            className={"h-8 rounded border-[1px] w-full border-gray-200 pl-2 my-auto ml-2 outline-none "}
                            type={"text"} placeholder={"Search"} />
                    </div>
                </div>

                <div className={"h-fit my-auto flex w-1/2 justify-end gap-5 items-center hover:text-white"}>
                    <Link href={"/library"} className={"text-white font-semibold decoration-white border border-transparent rounded-lg hover:border-white px-2 py-1 text-lg"}>Library</Link>
                    <Link href={"/my-classes"} className={"text-white font-semibold border border-transparent rounded-lg hover:border-white px-2 py-1 text-lg"}>My Classes</Link>
                    {/*<Link href={"/profile"} className={"text-white font-semibold text-lg"}>Profile</Link>*/}
                    {isAuthenticated ? <LoggedInDropdown /> : <DefaultDropdown />}
                </div>


            </div>
        </>
    )
}

export default Header;
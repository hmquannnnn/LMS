'use client';

import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { callGetPageFavoriteDocuments } from "@/apis/userAPI";
import { callGetDocuments } from "@/apis/documentsAPI";
import { Spin, Button, Modal } from 'antd';
import Image from 'next/image'

const formatDocumentTitle = (title: string) => {
    return title.charAt(0).toUpperCase() + title.substring(1).toLowerCase();
}

function isJwtExpired(token: String) {
    // Decode the payload of the JWT
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    // Get the current time in Unix format
    const currentTime = Math.floor(Date.now() / 1000);

    // Check if the token is expired
    return decodedPayload.exp < currentTime;
}

const topicNames = {
    CULTURE: 'VĂN HÓA',
    SPORT: 'THỂ THAO',
    SOCIAL: 'XÃ HỘI',
    TOURISM: 'DU LỊCH',
    BUSINESS: 'KINH DOANH',
    JOB: 'VIỆC LÀM',
    HEALTH: 'SỨC KHỎE',
    RELAX: 'GIẢI TRÍ'
}

const TopicDetailPage = (props: any) => {
    const [favoriteDocuments, setFavoriteDocuments] = useState([]);
    const [openRemindLoginModal, setOpenRemindLoginModal] = useState(false);
    const [documentList, setDocumentList] = useState([]);
    const user = useSelector((state) => state.account.user);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFavoriteData = async (userId: String) => {
            try {
                const response = await callGetPageFavoriteDocuments(userId, 0, 5);
                console.log(response.data);
                setFavoriteDocuments(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        if (user?.id != '0') {
            fetchFavoriteData(user?.id);
        }
    }, [user])

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await callGetDocuments(null, props.params.topicName.toUpperCase());
                console.log(response);
                setDocumentList(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchDocuments();
    }, [props.params.topicName])

    const handleCancelModal = () => {
        setOpenRemindLoginModal(false);
    }

    const handleGoToLogin = () => {
        setOpenRemindLoginModal(false);
        router.push('/login');
    }

    if (loading) {
        return (
            <div className="w-full flex justify-center h-screen mt-[50vh]">
                <Spin />
            </div>
        );
    }

    return (
        <>
            <div className=" fixed flex  flex-col h-[90vh] gap-10 w-[18%] mt-8 pl-10">
                <div className="h-screen pb-10">

                    <div className="h-full border-2 rounded-xl pl-4 pt-4 pr-6">

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
                        <span className="font-headingText text-blue_5 mb-3 inline-block cursor-pointer" onClick={() => {
                            // check token from localStorage if it's not exist or expired, redirect to login page
                            const token = localStorage.getItem('token');
                            if (!token || isJwtExpired(token)) {
                                setOpenRemindLoginModal(true);
                                return;
                            }
                            router.push('/library/favorite');
                        }}>Danh sách yêu thích</span>

                        <ul className="pl-2">
                            {favoriteDocuments.length > 0 && favoriteDocuments.map((document, index) => {
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
                                )
                            })}
                        </ul>
                    </div>
                </div >
            </div>

            <div className="w-[80%] mt-8 ml-[20%]">
                <div className="h-[90vh]  pl-10 pt-1 pr-8 mr-10">
                    <div className="flex items-center gap-4">
                        <Image src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSw5AP3H_GiJXKNUfyvPZye9h6XT0N01JcsIIn1OepH6N60fx-U" alt="Demo culture topic picture" width={110} height={110} />
                        <h1 className="font-headingOpenSans font-bold text-xl inline align-middle ml-4">
                            {topicNames[props.params.topicName.toUpperCase()].toLocaleUpperCase()}
                        </h1>

                    </div>
                    <div className="h-[1px] bg-blue_3 mt-5 mb-5 mx-4"></div>
                    <div className="">
                        <ul className="pl-2 grid grid-cols-[60px_3fr_1fr]  ">
                            <div className="border-r-[1px] border-blue_5"></div>
                            <div className="border-r-[1px] border-blue_5 text-center pb-4 font-bold text-lg">Văn bản</div>
                            <div className="text-center font-bold text-lg">Dạng thức</div>
                            {/* <div></div> */}
                            {documentList?.length > 0 && documentList.map((document, index) => {
                                return (
                                    <>

                                        <div className="pb-2 border-r-[1px] border-blue_5">{index + 1}</div>
                                        <li
                                            key={document.id}
                                            className="border-r-[1px] border-blue_5 pl-2 hover:font-bold hover:text-blue_5 line-clamp-2 cursor-pointer"
                                            onClick={() => {
                                                router.push(`/library/${document.id}`);
                                            }}
                                        >
                                            {document.title}
                                        </li>
                                        <div className="text-center flex justify-center items-center" >{
                                            document.type == "TEXT" ?
                                                (<svg
                                                    width="32px" height="32px"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect>
                                                        <path d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5" stroke="#000000" strokeLinejoin="round"></path>
                                                        <path d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471" stroke="#000000" strokeLinejoin="round"></path> </g>
                                                </svg>)
                                                :
                                                (<svg fill="#000000" width="32px" height="32px" viewBox="-7 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>headphones</title> <path d="M13.88 24.16c-0.48 0-0.84-0.36-0.84-0.84v-4.76c0-0.48 0.36-0.84 0.84-0.84s0.84 0.36 0.84 0.84v4.76c0 0.48-0.36 0.84-0.84 0.84zM3.84 24.16c-0.48 0-0.84-0.36-0.84-0.84v-4.76c0-0.48 0.36-0.84 0.84-0.84s0.84 0.36 0.84 0.84v4.76c-0.040 0.48-0.44 0.84-0.84 0.84zM16.76 21.8c-0.040 0-0.080 0-0.12 0-0.44-0.080-0.76-0.48-0.72-0.96 0-0.040 0.84-6-1.92-9.24-1.2-1.36-2.92-2.080-5.12-2.080s-3.92 0.68-5.12 2.080c-2.8 3.24-1.92 9.16-1.92 9.24 0.080 0.44-0.24 0.88-0.72 0.96-0.44 0.080-0.88-0.24-0.96-0.72-0.080-0.28-0.96-6.76 2.28-10.6 1.52-1.76 3.68-2.68 6.4-2.68s4.88 0.88 6.4 2.68c3.28 3.8 2.36 10.32 2.32 10.56-0.040 0.44-0.4 0.76-0.8 0.76z"></path> </g></svg>)
                                        }
                                        </div>

                                    </>
                                )
                            })}
                        </ul>
                    </div>

                </div>
            </div>
            <Modal
                open={openRemindLoginModal}
                title='Bạn chưa đăng nhập'
                onCancel={handleCancelModal}
                footer={[
                    <Button key="back" onClick={handleCancelModal}>
                        Cancel
                    </Button>,
                    <Button className="bg-blue_3 text-white hover:bg-white" key="submit" loading={loading} onClick={handleGoToLogin}>
                        Login
                    </Button>,
                ]}
            >
                <div>Vui lòng đăng nhập để thực hiện hành động.</div>
            </Modal >
        </>
    );
}

export default TopicDetailPage;
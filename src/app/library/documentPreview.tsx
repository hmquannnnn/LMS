import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';
import { ShareIcon, HeartLikeIcon, HeartUnLikeIcon, PracticeIcon } from './DocumentPreviewIcon';
import { Dropdown, MenuProps } from "antd";
import { useState } from 'react';
import { callLikeDocument, callUnLikeDocument } from '@/apis/documentsAPI';
import { RemindLoginModal } from '@/components/remindLogin';
import { FacebookIcon, TwitterIcon } from '@/components/sidebarIcon';
import { usePathname } from 'next/navigation';
import { useSelector } from "react-redux";

const DocumentPreview = ({ props }) => {

    // const [openRemindLoginModal, setOpenRemindLoginModal] = useState(false);
    // const [loading, setLoading] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const document = props.data;
    const [isLiked, setIsLiked] = useState(document?.isLiked);
    const [isModalOpen, setIsModelOpen] = useState(false);
    const pathName = usePathname();
    const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
    const toggleModal = (isOpen: Boolean) => {
        setIsModelOpen(isOpen);
    }
    const router = useRouter()


    const onLike = async () => {
        setIsLiked(true);
        await callLikeDocument(document?.id)
            .then((res) => {
                console.log(res);
                if (res.status === 401) {
                    setIsModelOpen(true);
                    setIsLiked(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLiked(false);
            });
    };

    const onUnLike = async () => {
        setIsLiked(false);
        await callUnLikeDocument(document?.id)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLiked(true);
            });

    };

    const handleClickOnPractice = (testType: String) => {
        if (!isAuthenticated) {
            setIsModelOpen(true);
        } else {
            router.push(`/library/${document?.id}/${testType}`);
        }
    }

    const socialMediaItems: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <div className='flex items-center justify-between' onClick={() => {
                    window.open(
                        "https://www.facebook.com/sharer/sharer.php?u=" +
                        NEXT_PUBLIC_FRONTEND_URL +
                        '/library/' + document?.id,
                        "facebook-share-dialog",
                        "width=600,height=600",
                    );
                }}>
                    <span>Chia sẻ qua Facebook</span>
                    &nbsp;
                    <FacebookIcon

                    />
                </div>
            )
            ,
        },
        {
            key: "2",
            label: (
                <div className='flex items-center justify-between' onClick={() => {
                    window.open(
                        "https://twitter.com/intent/tweet?url=" +
                        NEXT_PUBLIC_FRONTEND_URL +
                        '/library/' + document?.id,
                        "twitter-share-dialog",
                        "width=600,height=600",
                    );
                }}>
                    <span>Chia sẻ qua Twitter</span>
                    &nbsp;
                    <TwitterIcon

                    />
                </div>

            ),
        }
    ];

    const practiceItems: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <div className='flex items-center justify-between h-[40px]' onClick={() => {
                    handleClickOnPractice('READING');
                }}>
                    <span>{document?.type == 'AUDIO' || document?.type == 'VIDEO' ? "Nói và nghe" : "Đọc hiểu"}</span>
                </div>
            )
            ,
        },
        {
            key: "2",
            label: (
                <div className='flex items-center justify-between h-[40px]' onClick={() => {
                    handleClickOnPractice('WRITING');
                }}>
                    <span>Viết</span>
                </div>

            ),
        }
    ];

    return (
        // <div className={`min-w-[${props.imgWidth}] max-w-[${props.imgWidth}] `} >
        <div className={`w-full flex gap-[4vw]   ${props?.isOddIndex ? 'flex-row-reverse' : 'flex-row'}`}>

            {/* <div className={`flex content-center w-1/2 min-h-[${props.imgHeight}] cursor-pointer  `}> */}
            <div className='w-[45%] hover:opacity-80 transition duration-300 h-[450px]'>
                <Link href={`library/${document?.id}`} >
                    <Image
                        // width={props.imgWidth.substring(0, props.imgWidth.length - 2)}
                        // height={props.imgHeight.substring(0, props.imgHeight.length - 2)}
                        width="3000"
                        height="3000"
                        oject-fit="contain"
                        src={props.imgUrl ? props.imgUrl : props.url}
                        alt="cover"
                        className="w-full h-full object-cover rounded-2xl"
                        loading="lazy"
                    />
                </Link>
            </div>
            {/* </div> */}
            <div className='mt-4 w-[55%] flex flex-col'>
                <h1 className={`text-[1.4em] font-timesNewRoman cursor-pointer  font-bold leading-[1.5em] mb-2 hover:text-purple_3 hover:duration-300 ${props.isOddIndex ? 'text-right' : ''}`}><Link scroll={true} href={`library/${document?.id}`}>{document?.title ? document?.title : props?.title}</Link></h1>
                <p className={`text-[1em] font-[350] leading-[1.5em] line-clamp-3  ${props.isOddIndex ? 'text-right' : ''}`}>{document?.veryFirstText ? document?.veryFirstText : props?.veryFirstText}</p>

                <div className={`w-full flex ${props.isOddIndex ? 'justify-end' : 'justify-start'}`}>
                    <Link scroll={true} className='mt-5 mb-5 flex items-center px-5 hover:bg-opacity-80  py-0.5 rounded-3xl bg-purple_3 text-white font-josefin text-sm' href={`/library/${document?.id}`} >
                        <span>Đọc tiếp </span>
                        &nbsp;
                        <svg width="58" height="27" xmlns="http://www.w3.org/2000/svg" overflow="hidden"><g transform="translate(-531 -17)"><path d="M21.0113 9.08241C20.8996 8.97449 20.7216 8.97758 20.6137 9.08932 20.5084 9.19831 20.5084 9.37111 20.6137 9.48009L24.3475 13.214C24.3486 13.2151 24.3486 13.2169 24.3475 13.2179 24.347 13.2184 24.3463 13.2188 24.3456 13.2188L1.96875 13.2188C1.81342 13.2188 1.6875 13.3447 1.6875 13.5 1.6875 13.6553 1.81342 13.7812 1.96875 13.7812L24.3456 13.7812C24.3471 13.7813 24.3483 13.7825 24.3483 13.7841 24.3483 13.7848 24.348 13.7855 24.3475 13.786L20.6137 17.5199C20.5019 17.6278 20.4988 17.8059 20.6067 17.9176 20.7147 18.0293 20.8927 18.0324 21.0044 17.9245 21.0068 17.9222 21.0091 17.9199 21.0113 17.9176L25.2301 13.6988C25.3399 13.589 25.3399 13.411 25.2301 13.3012Z" stroke="#FFFFFF" strokeWidth="0.315789" fill="#FFFFFF" transform="matrix(2.14815 0 0 1 531 17)" /></g></svg>
                    </Link>
                </div>

                <div className={`flex flex-1 w-full gap-5 items-end  ${props.isOddIndex ? 'justify-end' : 'justify-start'}`}>
                    <div className='max-w-[200px] h-min shadow-[rgba(0,0,0,0.15)_3px_3px_7px_1px] bg-purple_2 px-4 py-4 rounded-2xl cursor-pointer hover:shadow-[rgba(0,0,0,0.3)_3px_3px_7px_1px]' onClick={() => isLiked ? onUnLike() : onLike()}>
                        <div className='mb-2'>
                            {(!isLiked || isLiked == null) && (
                                <HeartLikeIcon />
                            )}
                            {isLiked && <HeartUnLikeIcon />}
                        </div>
                        <div className="font-josefin font-bold text-white">Yêu thích</div>
                        <div className='font-light text-xs'>Thêm vào bộ sưu tập yêu thích để lưu lại những thông tin hữu ích!</div>
                    </div>
                    <Dropdown menu={{ items: practiceItems }} placement="bottom" >
                        <div className='max-w-[200px] h-min shadow-[rgba(0,0,0,0.15)_3px_3px_7px_1px] sha px-4 py-4 rounded-2xl cursor-pointer hover:shadow-[rgba(0,0,0,0.3)_3px_3px_7px_1px]'>
                            <div className='mb-2'>
                                <PracticeIcon />
                            </div>
                            <div className="font-josefin font-bold ">Luyện tập</div>
                            <div className='font-light text-xs'>Thực hành hệ thống bài tập nhằm phát triển năng lực.</div>
                        </div>
                    </Dropdown>

                    <Dropdown menu={{ items: socialMediaItems }} placement="bottom" >
                        <div className='max-w-[200px] h-min shadow-[rgba(0,0,0,0.15)_3px_3px_7px_1px] sha px-4 py-4 rounded-2xl cursor-pointer hover:shadow-[rgba(0,0,0,0.3)_3px_3px_7px_1px]' >
                            <div className='mb-2'>
                                <ShareIcon />
                            </div>
                            <div className="font-josefin font-bold ">Chia sẻ</div>
                            <div className='font-light text-xs'>Chia sẻ trên các nền tảng mạng xã hội nhằm lan tỏa giá trị.</div>
                        </div>
                    </Dropdown>
                </div>
            </div>
            <RemindLoginModal open={isModalOpen} toggleModal={toggleModal} />
        </div>

    );
}

export default DocumentPreview;
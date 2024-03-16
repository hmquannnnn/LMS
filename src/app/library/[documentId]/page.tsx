"use client";
import { useEffect, useRef, useState } from "react";
import { NotionRenderer } from "react-notion";
import {
  callGetDocumentById,
  callLikeDocument,
  callUnLikeDocument,
} from "@/apis/documentsAPI";
import {
  FacebookIcon,
  HeartLikeIcon,
  HeartUnLikeIcon,
  TwitterIcon,
} from "../../../components/sidebarIcon";
import { callGetPageFavoriteDocuments } from "@/apis/userAPI";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import "@/style/notion.css";
// import "prismjs/themes/prism-tomorrow.css";
import { Button, Modal, Spin, Breadcrumb } from "antd";

function formatVietnameseDateTime(dateTime: Date) {
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  const dayOfWeek = days[dateTime.getDay()];
  const date = dateTime.getDate().toString().padStart(2, "0");
  const month = months[dateTime.getMonth()];
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours().toString().padStart(2, "0");
  const minute = dateTime.getMinutes().toString().padStart(2, "0");
  const second = dateTime.getSeconds().toString().padStart(2, "0");

  return `${dayOfWeek}, ${date}/${month}/${year}, ${hour}:${minute}:${second}`;
}

export const formatDocumentTitle = (title: string) => {
  return title.charAt(0).toUpperCase() + title.substring(1).toLowerCase();
};

function isJwtExpired(token: String) {
  // Decode the payload of the JWT
  const payloadBase64 = token.split(".")[1];
  const decodedPayload = JSON.parse(atob(payloadBase64));

  // Get the current time in Unix format
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the token is expired
  return decodedPayload.exp < currentTime;
}

const topicMapping = {
  "SOCIAL": "Xã hội",
  "CULTURE": "Văn hóa",
  "SPORT": "Thể thao",
  "TOURISM": "Du lịch"
}

const DocumentIdPage = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [openRemindLoginModal, setOpenRemindLoginModal] = useState(false);
  const NEXT_PUBLIC_FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const postTime = useRef<String>();
  const [currentDocument, setCurrentDocument] = useState();
  const documentTitle = useRef();
  // const favoriteDocuments = useRef();
  const [favoriteDocuments, setFavoriteDocuments] = useState();
  const documentId = params.documentId;
  const pathName = usePathname();
  // const [user, setUser] = useState();
  const user = useSelector((state) => state.account.user);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const document: any = await callGetDocumentById(documentId);
        setCurrentDocument(document);
        const notionPageId = document.notionPageId;
        postTime.current = formatVietnameseDateTime(
          new Date(document.postTime),
        );
        documentTitle.current = document.title;
        const response = await fetch(
          `https://notion-api.splitbee.io/v1/page/${notionPageId}`,
        );
        const data = await response.json();
        setData(data);
        setIsLiked(document.isLiked);
        // add delay to show loading spinner
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  const pathname = usePathname();
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

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

  const onLike = async () => {
    setIsLiked(true);
    await callLikeDocument(documentId)
      .then((res) => {
        console.log(res);
        if (res.status === 401) {
          setOpenRemindLoginModal(true);
          setIsLiked(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLiked(false);
      });
    if (user?.id != "0") {
      fetchFavoriteData(user?.id);
    }
  };

  const onUnLike = async () => {
    setIsLiked(false);
    await callUnLikeDocument(documentId)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLiked(true);
      });
    if (user?.id != "0") {
      fetchFavoriteData(user?.id);
    }
  };

  const handleCancelModal = () => {
    setOpenRemindLoginModal(false);
  };

  const handleGoToLogin = () => {
    setOpenRemindLoginModal(false);
    router.push("/login");
  };

  if (notFound) {
    return (
      <div className="w-full flex justify-center h-screen mt-[50vh]">
        <h1>404 | Not Found</h1>
      </div>
    );
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
      <div className=" fixed flex  flex-col h-[90vh] gap-10 w-[18%] mt-4  pl-10">
        {/* bg-gradient-to-br from-pink_1 to-yellow_1 */}
        {/* <div className="h-40 border-2  rounded-xl "></div> */}
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
          <span
            className="font-headingText text-blue_5 mb-3 inline-block cursor-pointer"
            onClick={() => {
              // check token from localStorage if it's not exist or expired, redirect to login page
              const token = localStorage.getItem("token");
              if (!token || isJwtExpired(token)) {
                setOpenRemindLoginModal(true);
                return;
              }
              router.push("/library/favorite");
            }}
          >
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
      <div className="fixed right-0 flex flex-col gap-2 w-fit  pr-[2vw] pt-56 ">
        <FacebookIcon
          onClick={() => {
            window.open(
              "https://www.facebook.com/sharer/sharer.php?u=" +
              NEXT_PUBLIC_FRONTEND_URL +
              pathName,
              "facebook-share-dialog",
              "width=600,height=600",
            );
          }}
        />
        <TwitterIcon
          onClick={() => {
            window.open(
              "https://twitter.com/intent/tweet?url=" +
              NEXT_PUBLIC_FRONTEND_URL +
              pathName,
              "twitter-share-dialog",
              "width=600,height=600",
            );
          }}
        />
        <div className="h-[1px] bg-gray-300 mx-1.5"></div>

        {(!isLiked || isLiked == null) && (
          <HeartLikeIcon onClick={() => onLike()} />
        )}
        {isLiked && <HeartUnLikeIcon onClick={() => onUnLike()} />}
      </div>

      <div className="flex justify-start mx-auto ml-[20vw] pr-[5vw] mr-[4vw] ">

        <div className=" pl-10 pr-20 mt-4">
          <Breadcrumb
            items={[
              {
                href: '/library',
                title: <div className="flex group " >
                  <svg className="group-hover:fill-black" xmlns="http://www.w3.org/2000/svg" fill="#AAA" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
                  </svg>
                  &nbsp;
                  <span>Thư viện</span>
                </div>,
              },
              {
                href: '/library/topics/' + currentDocument?.topic,
                title: (
                  <>
                    {/* <UserOutlined /> */}
                    <span>{topicMapping[currentDocument?.topic]}</span>
                  </>
                ),
              }
            ]}
          />
          {data && (
            <div className="font-headingOpenSans font-[550] mx-auto my-0  text-[2.5rem] mt-[0.25em] mb-[0.25em]">
              {documentTitle.current}
            </div>
          )}
          {postTime.current && (
            <p className="mx-auto my-0  text-sm text-gray-500">
              {postTime.current}
            </p>
          )}

          {data && <NotionRenderer blockMap={data} fullPage hideHeader />}
        </div>
        <div></div>
      </div>

      <div className="z-[1000]">
        <Modal
          open={openRemindLoginModal}
          title="Bạn chưa đăng nhập"
          onCancel={handleCancelModal}
          footer={[
            <Button key="back" onClick={handleCancelModal}>
              Hủy
            </Button>,
            <Button
              className="bg-blue_3 text-white hover:bg-white"
              key="submit"
              loading={loading}
              onClick={handleGoToLogin}
            >
              Đăng nhập
            </Button>,
          ]}
        >
          <div>Vui lòng đăng nhập để thực hiện hành động.</div>
        </Modal>
      </div>

      {/* </StickyContainer> */}
    </>
  );
};

export default DocumentIdPage;

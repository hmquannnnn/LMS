"use client";

import { useEffect, useRef, useState } from "react";
import { NotionRenderer } from "react-notion";
import { callGetDocumentCounselling, callGetDocumentById, } from "@/apis/documentsAPI";
import {
  formatVietnameseDateTime,
  topicMapping,
} from "@/app/library/[documentId]/page";

import { Breadcrumb } from "antd";
import { colors } from "@/utils/constant";

const Counselling = ({ params }) => {
  const documentId = params.documentId;
  const postTime = useRef();
  const documentTitle = useRef();
  const [data, setData] = useState(null);
  const [currentDocument, setCurrentDocument] = useState();
  const [counsellingItems, setCounsellingItems] = useState([]);

  const items = [
    {
      type: "social",
      title: "Xã hội",
      bgColor: colors.green_7,
      textColor: colors.green_3,
      svgFill: colors.green_3
    },
    {
      type: "research",
      title: "Nghiên cứu",
      bgColor: colors.blue_6,
      textColor: colors.blue_10,
      svgFill: colors.blue_10
    },
    {
      type: "technique",
      title: "Kỹ thuật",
      bgColor: colors.yellow_3,
      textColor: colors.yellow_2,
      svgFill: colors.yellow_2
    },
    {
      type: "management",
      title: "Quản lý",
      bgColor: colors.pink_6,
      textColor: colors.pink_5,
      svgFill: colors.pink_5
    },
    {
      type: "major",
      title: "Nghiệp vụ",
      bgColor: colors.grey_3,
      textColor: colors.grey_2,
      svgFill: colors.grey_2
    },
    {
      type: "art",
      title: "Nghệ thuật",
      bgColor: colors.pink_7,
      textColor: colors.pink_4,
      svgFill: colors.pink_4
    },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const document = await callGetDocumentById(documentId);
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchCounselling = async () => {
      try {
        const counselling = await callGetDocumentCounselling(documentId);
        setCounsellingItems(counselling);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchCounselling();
  }, []);



  return (
    <>
      <Breadcrumb
        className={"ml-5"}
        items={[
          {
            href: "/library",
            title: (
              <div className="flex group ">
                <svg
                  className="group-hover:fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#AAA"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
                </svg>
                &nbsp;
                <span>Thư viện</span>
              </div>
            ),
          },
          {
            href: "/library/topics/" + currentDocument?.topic,
            title: (
              <>
                {/* <UserOutlined /> */}
                <span>{topicMapping[currentDocument?.topic]}</span>
              </>
            ),
          },
          {
            href: `/library/${documentId}`,
            title: <p>{documentTitle.current}</p>,
          },
        ]}
      />
      <div className={"grid grid-cols-2 h-full test-page"}>
        <div
          className={
            "border-r-[1px] col-span-1 h-full border-blue_3 scrollable-column"
          }
        >
          {/*<div className="flex justify-start mx-auto ml-[20vw] pr-[5vw] mr-[4vw] ">*/}
          <div className=" pl-10 pr-20">
            {data && (
              <div className="font-headingOpenSans font-[550] mx-auto my-0  text-[2.5rem] mb-[0.25em]">
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
          {/*</div>*/}
        </div>
        <div className="px-10">
          <div className="font-bold">Tham khảo bộ nhiệm vụ trải nghiệm nghề nghiệp dưới dây và hãy chọn thực hiện một nhiệm vụ em cảm thấy phù hợp nhé!</div>
          {items.map((item, index) => {
            if (counsellingItems.filter(d => d.orientation.toLowerCase() == item.type) == 0) return null;
            return (
              <div key={index} className="mt-5">
                <div className="w-full text-center font-bold py-1" style={{ background: item.bgColor, color: item.textColor }}>
                  {item.title}
                </div>
                {counsellingItems.filter(d => d.orientation.toLowerCase() == item.type).map((item1, index) =>
                  <div key={index} className="flex mt-5 gap-2 ml-4">
                    {/* <div>{item.title}</div> */}
                    <div>
                      <svg width="20" height="21" xmlns="http://www.w3.org/2000/svg" overflow="hidden"><g transform="translate(-687 -199)"><path d="M17.7083 7.08333 7.39583 7.08333 11.25 6.22917C11.8125 6.10417 12.1667 5.54167 12.0417 4.97917 11.9167 4.41667 11.3542 4.0625 10.7917 4.1875L5.16667 5.4375C4.95833 5.5 4.75 5.625 4.58333 5.83333L2.8125 8.125 1.25 8.125 1.25 14.1667 2.29167 14.1667C3.77083 14.1667 3.875 15.8333 6.66667 15.8333 7.33333 15.8333 9.54167 15.8333 10.4167 15.8333 11.1042 15.8333 11.6667 15.2708 11.6667 14.5833 11.6667 14.25 11.5417 13.9583 11.3333 13.75 11.375 13.75 11.4167 13.75 11.4583 13.75 12.1458 13.75 12.7083 13.1875 12.7083 12.5 12.7083 12.1667 12.5833 11.8542 12.3542 11.625 12.9167 11.5 13.3333 11 13.3333 10.4167 13.3333 9.72917 12.7708 9.16667 12.0833 9.16667L17.7083 9.16667C18.2917 9.16667 18.75 8.70833 18.75 8.125 18.75 7.54167 18.2917 7.08333 17.7083 7.08333Z"
                        fill={item.svgFill} transform="matrix(1 0 0 1.05 687 199)" /></g></svg>
                    </div>
                    <div>{item1.content}</div>
                  </div>
                )}

              </div>
            )
          })
          }
        </div>
      </div>
    </>
  );
};

export default Counselling;

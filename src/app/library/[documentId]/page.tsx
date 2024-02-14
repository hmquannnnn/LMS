'use client'
import { useEffect, useState, useRef } from "react";
import { NotionRenderer } from "react-notion";
import { callGetDocumentById } from "@/apis/documentsAPI";
import FacebookIcon from "./component/facebookIcon";
import { StickyContainer, Sticky } from 'react-sticky';
// import "react-notion/src/styles.css";
import "@/style/notion.css";
// import "prismjs/themes/prism-tomorrow.css";
import { Divider, Spin } from 'antd';

function formatVietnameseDateTime(dateTime: Date) {
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    const dayOfWeek = days[dateTime.getDay()];
    const date = (dateTime.getDate()).toString().padStart(2, '0');
    const month = months[dateTime.getMonth()];
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();

    return `${dayOfWeek}, ${date}/${month}/${year}, ${hour}:${minute}:${second} GMT+7`;
}

const DocumentIdPage = ({ params }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const postTime = useRef();
    const documentTitle = useRef();
    const documentId = params.documentId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const document = await callGetDocumentById(documentId);
                const notionPageId = await document.notionPageId;
                postTime.current = await formatVietnameseDateTime(new Date(document.postTime));
                documentTitle.current = await document.title;
                const response = await fetch(`https://notion-api.splitbee.io/v1/page/${notionPageId}`);
                const data = await response.json();
                setData(data);
                // add delay to show loading spinner
                // await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.error('Error fetching data:', error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [documentId]);

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
            {/* <StickyContainer > */}
            < div className="flex justify-start mx-auto w-fit translate-x-[-2vw]" >
                <div className="w-fit pr-10 pt-56" > <FacebookIcon /></div >
                {/* <Sticky>
                        {props => (<div className="sticky top-0 z-1"><FacebookIcon /></div>)}
                    </Sticky> */}
                <div>
                    {data && <div className="mx-auto my-0 max-w-[708px] text-[2.5rem] font-[520] mt-[0.75em] mb-[0.25em]">{documentTitle.current}</div>}
                    {postTime.current && <p className="mx-auto my-0 max-w-[708px] text-sm text-gray-500">{postTime.current}</p>}
                    {data && <NotionRenderer blockMap={data} fullPage hideHeader />}
                </div>
                <div></div>
            </div >
            {/* </StickyContainer> */}
        </>
    );
}

export default DocumentIdPage;

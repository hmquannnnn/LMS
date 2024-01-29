// // "use client";
// import { notion } from "@/notion";
// import { NotionPage } from "@/app/notion";
// import InputId from "@/app/library/post/input_id_page";
// import { useState, useEffect, useRef } from "react";
// import Preview from "@/app/library/post/preview";
// import { get } from "http";
// // import { getRootPageId } from "@/redux/slices/documentSlice";

// let rootPageId = "62996496e0fd4405a977b3f80c2f6fff";

// async function getData(rootPageId: string) {
//     return await notion.getPage(rootPageId);
// }




// const PostToLibrary = async () => {
//     const props = {
//         // data: null,
//         rootPageId: "62996496e0fd4405a977b3f80c2f6fff"
//     }
//     // const [rootPageId, setRootPageIdState] = useState("hello");
//     // let data = null;
//     // useEffect(() => {
//     //     data = getData(rootPageId)
//     //     // rootPageId = getRootPageId();
//     //     // console.log(rootPageId);
//     // }, [rootPageId]);

//     // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     //     const newRootPageId = event.target.value;
//     //     setRootPageIdState(newRootPageId);
//     // };
//     // const data = getData(rootPageId);
//     // console.log(notion.getPage(rootPageId))
//     return (
//         <>
//             <div className="flex">
//                 <InputId />
//                 <Preview />
//             </div>
//         </>
//     )
// }

// export default PostToLibrary;

// pages/index.js
"use client"
import { useEffect, useState, useRef } from 'react';
// import { NotionPage } from "@/app/notion";
// import { NotionAPI } from 'notion-client'
// import { notion } from "@/notion";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";


import { NotionRenderer } from "react-notion";
// const notion = new NotionAPI();

// async function getData(rootPageId: string) {
//     return await notion.getPage(rootPageId);
// }

const Index = () => {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState();
    const documentTitle = useRef('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://notion-api.splitbee.io/v1/page/${inputValue}`);
                const data = await response.json();
                documentTitle.current = data[Object.keys(data)[0]]["value"]["properties"]["title"][0][0]
                let veryFirstText = data[Object.keys(data)[1]]["value"]["properties"]["title"][0][0]
                console.log(veryFirstText)
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // getData(inputValue).then((data) => setData(data));

        // Make sure to fetch data only on the client-side
        if (inputValue !== '') {
            // getData(inputValue).then((data) => setData(data));
            fetchData();
        }
    }, [inputValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };


    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter query..."
            />
            {data && (
                <div>
                    <h2>Results:</h2>
                    Title: {documentTitle.current}
                    {/* <ul>
                        {data.map((item, index) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ul> */}
                    {/* hello
                    hi{ }hi */}
                    <NotionRenderer blockMap={data} fullPage={true} />

                    {/* <NotionPage recordMap={data} rootPageId={"rootPageId"} /> */}
                </div>
            )}
        </div>
    );
};

export default Index;





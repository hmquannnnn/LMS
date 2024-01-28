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
import { useEffect, useState } from 'react';
import { NotionPage } from "@/app/notion";
import { NotionAPI } from 'notion-client'
// import { notion } from "@/notion";

const notion = new NotionAPI();

async function getData(rootPageId: string) {
    return await notion.getPage(rootPageId);
}

const Index = () => {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState();

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         const response = await fetch(`https://notion-api.splitbee.io/v1/page/${inputValue}`);
        //         const data = await response.json();
        //         setData(data);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // };

        // getData(inputValue).then((data) => setData(data));

        // Make sure to fetch data only on the client-side
        if (inputValue !== '') {
            // getData(inputValue).then((data) => setData(data));
            // fetchData();
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
                    {/* <ul>
                        {data.map((item, index) => (
                            <li key={index}>{item.name}</li>
                        ))}
                    </ul> */}
                    hello
                    hi{JSON.stringify(data)}hi
                    <NotionPage recordMap={data} rootPageId={"rootPageId"} />
                </div>
            )}
        </div>
    );
};

export default Index;





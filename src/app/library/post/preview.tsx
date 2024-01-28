"use client"
import { notion } from "@/notion";

import { NotionPage } from "@/app/notion";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Preview = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const rootPageId = useSelector((state: any) => state.document.rootPageId);
        // notion.getPage(rootPageId).then((data) => setData(data));
    }, []);

    // const data = useSelector((state: any) => state.document.data);

    return (
        <>
            <div className="flex">
                {data}
                <div>
                    Preview:
                    <div className="border">
                        {/* <NotionPage recordMap={data} rootPageId={"rootPageId"} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Preview;

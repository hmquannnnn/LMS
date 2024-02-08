'use client'
import { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { Spin } from 'antd';

const DocumentIdPage = ({ params }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const documentId = params.documentId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://notion-api.splitbee.io/v1/page/${documentId}`);
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
        <div>
            {/* DocumentIdPage {params.documentId} */}
            <div>
                {data && <NotionRenderer blockMap={data} fullPage hideHeader />}
            </div>
        </div>
    );
}

export default DocumentIdPage;

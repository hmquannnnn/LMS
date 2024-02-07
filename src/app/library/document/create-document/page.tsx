"use client"
import { useEffect, useState, useRef } from 'react';
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { callPostDocument, DocumentInput } from '@/apis/documentsAPI';


import { NotionRenderer } from "react-notion";

const Index = () => {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState();
    const documentTitle = useRef('');
    const veryFirstText = useRef('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://notion-api.splitbee.io/v1/page/${inputValue}`);
                const data = await response.json();

                documentTitle.current = data[Object.keys(data)[0]]["value"]["properties"]["title"][0][0]



                for (let key in Object.keys(data)) {
                    const block = data[Object.keys(data)[key]]["value"]
                    if (block["type"] === "text") {
                        for (let text of block["properties"]["title"]) {
                            veryFirstText.current += text[0]
                        }
                        break;
                    }
                }

                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (inputValue !== '') {
            fetchData();
        }
    }, [inputValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const onPostDocument = async (document: DocumentInput) => {
        let formData = new FormData();
        formData.append("title", document.title);
        formData.append("type", document.type);
        formData.append("veryFirstText", document.veryFirstText);
        formData.append("notionPageId", document.notionPageId);
        const response = await callPostDocument(formData);
        console.log(response);
    }


    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter query..."
            />
            <button onClick={() => onPostDocument(
                {
                    title: documentTitle.current,
                    type: "TEXT",
                    veryFirstText: veryFirstText.current,
                    notionPageId: inputValue
                }
            )}>Submit</button>
            {data && (
                <div>
                    <h2>Results:</h2>
                    Title: {documentTitle.current}
                    <br />
                    Sapo: {veryFirstText.current}
                    <NotionRenderer blockMap={data} fullPage hideHeader />
                </div>
            )}
        </div>
    );
};

export default Index;





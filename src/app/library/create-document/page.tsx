"use client"
import { useEffect, useState, useRef } from 'react';
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { callPostDocument, DocumentInput } from '@/apis/documentsAPI';


import { NotionRenderer } from "react-notion";

const blobUrlToFile = (blobUrl: string): Promise<File> => new Promise((resolve) => {
    fetch(blobUrl).then((res) => {
        res.blob().then((blob) => {
            // please change the file.extension with something more meaningful
            // or create a utility function to parse from URL
            const file = new File([blob], 'image.png', { type: blob.type })
            resolve(file)
        })
    })
})

const Index = () => {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState();
    const [fileInput, setFileInput] = useState(null);
    const documentTitle = useRef('');
    const veryFirstText = useRef('');
    const firstImageUrl = useRef('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://notion-api.splitbee.io/v1/page/${inputValue}`);
                const data = await response.json();

                documentTitle.current = data[Object.keys(data)[0]]["value"]["properties"]["title"][0][0]
                let index = 1;
                for (index; index < Object.keys(data).length; index++) {
                    const key = Object.keys(data).at(index)
                    if (data[key]["value"]["properties"] !== undefined) {
                        break;
                    }
                }


                firstImageUrl.current = ""
                for (let key in Object.keys(data)) {
                    const block = data[Object.keys(data)[key]]["value"]
                    if (block["type"] === "image") {
                        firstImageUrl.current = block["properties"]["source"][0][0]

                        try {
                            console.log("firstImageUrl: ", firstImageUrl)
                            const file = await blobUrlToFile(firstImageUrl.current)
                            setFileInput(file)
                            break;

                        } catch (error) {
                            // console.error('Error fetching data:', error);
                        }
                    }
                }



                veryFirstText.current = ""
                console.log("key data: ", Object.keys(data).at(index))
                const key = Object.keys(data).at(index)
                const block = data[key]["value"]
                for (let text of block["properties"]["title"]) {
                    veryFirstText.current += text[0]
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

    const handleFileInputChange = (e) => {
        setFileInput(e.target.files[0]);
    }

    const onPostDocument = async (document: DocumentInput) => {
        let formData = new FormData();
        formData.append("title", document.title);
        formData.append("type", document.type);
        formData.append("veryFirstText", document.veryFirstText);
        formData.append("notionPageId", document.notionPageId);
        formData.append("thumbnail", fileInput);
        const response = await callPostDocument(formData);
        console.log(response);
    }


    return (
        <div className='flex'>
            <div className='w-1/2'>
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
                <br />
                Thumbnail:
                <div className='max-w-[600px]'>
                    {
                        firstImageUrl.current != '' &&
                        <img src=
                            {
                                fileInput ? URL.createObjectURL(fileInput) : firstImageUrl.current
                            }
                            alt="thumbnail"
                        />
                    }
                </div>
                <br />
                <input type="file" onChange={handleFileInputChange} />
                <br />
                <br />
                <h2>Results:</h2>
                Title: {documentTitle.current}
                <br />
                Sapo: {veryFirstText.current}
            </div>
            <div className='w-1/2'>
                {data && (
                    <div>

                        <NotionRenderer blockMap={data} fullPage hideHeader />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;





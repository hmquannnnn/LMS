"use client"
import { useEffect, useState, useRef } from 'react';
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { callPostDocument, DocumentInput } from '@/apis/documentsAPI';
import { Button, Select } from 'antd';

import { NotionRenderer } from "react-notion";
import DocumentPreview from '@/app/library/documentPreview';
import { resolve } from 'path';
import { set } from 'react-hook-form';

const IMAGE_PLACEHOLDER = "https://placehold.co/600x400/png?text=%E1%BA%A2nh\nThumbnail&font=arial"
const TITLE_PLACEHOLDER = "Tiêu đề"
const SHORT_DESCRIPTION_PLACEHOLDER = "Mô tả ngắn"

const Index = () => {
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState();
    const [fileInput, setFileInput] = useState(null);
    const [documentTitle, setDocumentTitle] = useState(TITLE_PLACEHOLDER);
    const [veryFirstText, setVeryFirstText] = useState(SHORT_DESCRIPTION_PLACEHOLDER);
    const [topic, setTopic] = useState('SOCIAL');
    const [type, setType] = useState('');
    const [firstImageUrl, setFirstImageUrl] = useState(IMAGE_PLACEHOLDER);
    // const firstImageUrl = useRef(IMAGE_PLACEHOLDER);

    const resetPreview = () => {
        setDocumentTitle(TITLE_PLACEHOLDER)
        setVeryFirstText(SHORT_DESCRIPTION_PLACEHOLDER)
        setFirstImageUrl(IMAGE_PLACEHOLDER)
        setIsLoadingSubmit(false)
        setIsLoading(false)
        setData(null)
        setFileInput(null)
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`https://notion-api.splitbee.io/v1/page/${inputValue}`);
            const data = await response.json();

            setDocumentTitle(data[Object.keys(data)[0]]["value"]["properties"]["title"][0][0])

            let tmpFirstImageUrl = ""
            for (let key in Object.keys(data)) {
                const block = data[Object.keys(data)[key]]["value"]
                if (block["type"] === "image") {
                    tmpFirstImageUrl = block["properties"]["source"][0][0]
                    setFirstImageUrl(tmpFirstImageUrl)
                }
            }
            let index = 0;
            if (data[data[Object.keys(data)[0]]["value"]["content"][0]]["value"]["properties"] !== undefined) {
                index = Object.keys(data).indexOf(data[Object.keys(data)[0]]["value"]["content"][0])
            } else {
                index = 1;
                for (index; index < Object.keys(data).length; index++) {
                    const key = Object.keys(data).at(index)
                    if (data[key]["value"]["properties"] !== undefined) {
                        break;
                    }
                }
            }

            setVeryFirstText("")
            console.log("key data: ", Object.keys(data).at(index))
            const key = Object.keys(data).at(index)
            const block = data[key]["value"]
            let tmp = ""
            for (let text of block["properties"]["title"]) {
                tmp += text[0]
            }
            setVeryFirstText(tmp)
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const blobUrlToFile = (blobUrl: string): Promise<File> => new Promise((resolve, reject) => {
        console.log("blobUrl: ", blobUrl)
        fetch(blobUrl).then(async (res) => {
            try {
                const blob = await res.blob()
                const file = new File([blob], 'image.png', { type: blob.type })
                resolve(file)
            } catch (error) {
                reject(error)
            }
            // res.blob().then((blob) => {
            //     // please change the file.extension with something more meaningful
            //     // or create a utility function to parse from URL
            //     const file = new File([blob], 'image.png', { type: blob.type })
            //     resolve(file)
            // })
        }).catch((error) => {
            reject(error)
            // console.error('Error fetching data:', error);
            // setIsLoadingSubmit(false);
            // alert("Lấy ảnh từ bài đăng thất bại. Vui lòng thay đổi link ảnh hoặc tải ảnh lên.");
        });
    })
    // useEffect(() => {

    //     if (inputValue !== '') {
    //         fetchData();
    //     }
    // }, [inputValue]);

    const handleInputChange = (e) => {
        resetPreview()
        setInputValue(e.target.value);
    };

    const handleLoadDocument = () => {
        setData(null);
        if (inputValue != '') {

            setIsLoading(true);
            console.log('load document');
            fetchData();
        }
    }

    const handleFileInputChange = (e) => {
        setFileInput(e.target.files[0]);
    }

    const onPostDocument = async (document: DocumentInput, file: File | null) => {
        let formData = new FormData();
        formData.append("title", document.title);
        formData.append("type", document.type);
        formData.append("veryFirstText", document.veryFirstText);
        formData.append("notionPageId", document.notionPageId);
        formData.append("topic", document.topic)

        let isCanPost = false;
        if (file) {
            formData.append("thumbnail", file);
            isCanPost = true;
        } else {
            const isGetImageSuccess = await blobUrlToFile(firstImageUrl).then((file) => {
                formData.append("thumbnail", file);
                return true
            }).catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoadingSubmit(false);
                alert("Lưu ảnh từ link thất bại. Vui lòng thay đổi link ảnh hoặc tải ảnh lên.");

                return false
            });
            if (isGetImageSuccess) isCanPost = true;
        }

        if (isCanPost) {
            alert("Đăng bài thành công");
        }

        // setFileInput(file)
        // setIsLoadingSubmit(true);
        // const response = await callPostDocument(formData).then((res) => {
        //     console.log(res);
        //     setIsLoadingSubmit(false);
        //     alert("Đăng bài thành công");
        //     resolve(res);
        // }
        // ).catch((error) => {
        //     console.error('Error fetching data:', error);
        //     alert("Đăng bài thất bại");
        //     setIsLoadingSubmit(false);
        // });

        // console.log(response);
    }


    return (
        <div className='flex gap-5'>
            <div className='w-1/2 mt-4'>
                <div className='flex flex-col  pl-4 '>
                    <div className='flex-1 flex mb-4'>
                        <div className='flex-1 flex  mr-2'>
                            <div className='mr-2 font-bold'>Notion page&apos;s Id:</div>
                            <input
                                className='flex-auto border-b-[1px] border-black focus:outline-none'
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Enter query..."
                            />
                            <Button loading={isLoading} onClick={handleLoadDocument}>Load</Button>
                        </div>
                    </div>
                    <div className='flex-1 flex mb-4'>
                        <div className='flex-1 flex  mr-2'>
                            <div className='mr-2 font-bold'>Tiêu đề:</div>
                            <input
                                className='flex-auto border-b-[1px] border-black focus:outline-none'
                                type="text"
                                value={documentTitle}
                                onChange={(e) => setDocumentTitle(e.target.value)}
                                placeholder="Enter query..."
                            />
                        </div>
                    </div>

                    <div className='flex-1 flex mb-4'>
                        <div className='flex-1 flex  mr-2'>
                            <div className='mr-2 font-bold'>Sapo:</div>
                            <input
                                className='flex-auto border-b-[1px] border-black focus:outline-none'
                                type="text"
                                value={veryFirstText}
                                onChange={(e) => setVeryFirstText(e.target.value)}
                                placeholder="Enter query..."
                            />
                        </div>
                    </div>
                    <div className='flex-1 flex mb-4'>
                        <div className='flex-1 flex  mr-2'>
                            <div className='mr-2 font-bold'>Link ảnh:</div>
                            <input
                                className='flex-auto border-b-[1px] border-black focus:outline-none'
                                type="text"
                                value={veryFirstText}
                                onChange={(e) => setVeryFirstText(e.target.value)}
                                placeholder="Enter query..."
                            />
                        </div>
                    </div>

                    <div className='flex-1 flex mb-4'>
                        <div className='flex-1 flex  mr-2'>
                            <div className='mr-2 font-bold'>Thể loại:</div>
                            <Select onChange={(val) => setTopic(val)} defaultValue={'Văn hóa'}>
                                <Select.Option value="CULTURE">Văn hóa</Select.Option>
                                <Select.Option value="SOCIAL">Xã hội</Select.Option>
                                <Select.Option value="SPORT">Thể thao</Select.Option>
                                <Select.Option value="TOURISM">Du lịch</Select.Option>
                            </Select>
                        </div>
                    </div>

                    <Button type="default"
                        className='text-purple_1 border-purple_1 hover:bg-purple_1 hover:text-white'
                        loading={isLoadingSubmit}
                        onClick={() => onPostDocument(
                            {
                                title: documentTitle,
                                type: "TEXT",
                                topic: topic,
                                veryFirstText: veryFirstText,
                                notionPageId: inputValue
                            }, null
                        )}>Submit</Button>
                </div>
                <div className='flex justify-center pl-[2vw] mt-10'>
                    <DocumentPreview props={{ data: data, url: fileInput ? URL.createObjectURL(fileInput) : firstImageUrl, veryFirstText: veryFirstText, title: documentTitle }} />
                </div>
                {/* <div className='max-w-[600px]'>
                    {
                        firstImageUrl.current != '' &&
                        <img src=
                            {
                                fileInput ? URL.createObjectURL(fileInput) : firstImageUrl.current
                            }
                            alt="thumbnail"
                        />
                    }
                </div> */}
            </div>
            <div className='flex-1'>
                <div className='border h-screen overflow-scroll'>
                    {data && (
                        <div>

                            <NotionRenderer blockMap={data} fullPage hideHeader />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Index;





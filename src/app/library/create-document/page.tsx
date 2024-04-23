"use client"
import { useEffect, useState, useRef } from 'react';
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { callPostDocument, DocumentInput } from '@/apis/documentsAPI';
import { Button, Select, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { NotionRenderer } from "react-notion";
import DocumentPreview from '@/app/library/documentPreview';
import { FormProvider } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as XLSX from 'xlsx';
import { callCreateTest } from '@/apis/testAPI';

// /* load 'fs' for readFile and writeFile support */
// import * as fs from 'fs';
// XLSX.set_fs(fs);
// import { Form } from "antd";
const IMAGE_PLACEHOLDER = "https://placehold.co/600x400/png?text=%E1%BA%A2nh\nThumbnail&font=arial"
const TITLE_PLACEHOLDER = "Tiêu đề"
const SHORT_DESCRIPTION_PLACEHOLDER = "Mô tả ngắn"


const Index = () => {
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCheckImage, setIsLoadingCheckImage] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState();
    const [fileInput, setFileInput] = useState(null);
    const [documentTitle, setDocumentTitle] = useState<string>('');
    const [veryFirstText, setVeryFirstText] = useState<string>('');
    const [topic, setTopic] = useState('CULTURE');
    const [type, setType] = useState('TEXT');
    const [firstImageUrl, setFirstImageUrl] = useState<string>('');
    const [testData, setTestData] = useState({});
    const [testType, setTestType] = useState('MULTIPLE_CHOICE');
    const [isLoadingCreateTest, setIsLoadingCreateTest] = useState(false);
    const [documentTestId, setDocumentTestId] = useState(0);
    // const firstImageUrl = useRef(IMAGE_PLACEHOLDER);
    const methods = useForm()
    const resetPreview = () => {
        setDocumentTitle('')
        setVeryFirstText('')
        setFirstImageUrl('')
        setIsLoadingSubmit(false)
        setIsLoading(false)
        setData(null)
        setFileInput(null)
    }

    const onSubmit = methods.handleSubmit(data => {
        onPostDocument(
            {
                title: documentTitle,
                type: type,
                topic: topic,
                veryFirstText: veryFirstText,
                notionPageId: inputValue
            }, fileInput
        )
    })

    const fetchData = async () => {
        try {
            const response = await fetch(`https://notion-api.splitbee.io/v1/page/${inputValue}`);
            const data = await response.json();

            // setDocumentTitle(data[Object.keys(data)[0]]["value"]["properties"]["title"][0][0])

            let tmpFirstImageUrl = ""
            for (let key in Object.keys(data)) {
                const block = data[Object.keys(data)[key]]["value"]
                if (block["type"] === "image") {
                    tmpFirstImageUrl = block["properties"]["source"][0][0]
                    setFirstImageUrl(tmpFirstImageUrl)
                }
            }
            // let index = 0;
            // if (data[data[Object.keys(data)[0]]["value"]["content"][0]]["value"]["properties"]["title"] !== undefined) {
            //     index = Object.keys(data).indexOf(data[Object.keys(data)[0]]["value"]["content"][0])
            // } else {
            //     index = 1;
            //     for (index; index < Object.keys(data).length; index++) {
            //         const key = Object.keys(data).at(index)
            //         if (data[key]["value"]["properties"]["title"] !== undefined) {
            //             break;
            //         }
            //     }
            // }

            // setVeryFirstText("")
            // console.log("key data: ", Object.keys(data).at(index))
            // const key = Object.keys(data).at(index)
            // const block = data[key]["value"]
            // let tmp = ""
            // for (let text of block["properties"]["title"]) {
            //     tmp += text[0]
            // }
            // setVeryFirstText(tmp)
            setData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);

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
            // handleCheckImageSaveAbility(firstImageUrl)

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
            // setFileInput(file)
            setIsLoadingSubmit(true);
            const response = await callPostDocument(formData)
                .then((res) => {
                    console.log(res);
                    setIsLoadingSubmit(false);
                    alert("Đăng bài thành công");
                    return res
                    // resolve(res);
                }).catch((error) => {
                    console.error('Error fetching data:', error);
                    alert("Đăng bài thất bại. Vui lòng chọn ảnh có kích thước nhỏ hơn.");
                    setIsLoadingSubmit(false);
                });

            // if (response.status == 200) {
            //     alert("Đăng bài thành công");
            //     setIsLoadingSubmit(false);

            // } else {
            //     alert("Đăng bài thất bại");
            //     setIsLoadingSubmit(false);

            // }

            setIsLoadingSubmit(false);
            console.log(response);
        }


    }

    const handleCheckImageSaveAbility = async () => {
        if (firstImageUrl == '') {
            alert("Vui lòng nhập link ảnh");
            return;
        }
        setIsLoadingCheckImage(true);
        await blobUrlToFile(firstImageUrl).then((file) => {
            setFileInput(file)
            setIsLoadingCheckImage(false);
            alert("Lưu ảnh từ link thành công");
        }).catch((error) => {
            console.error('Error fetching data:', error);
            setIsLoadingCheckImage(false);
            alert("Link ảnh không cho phép lưu do lỗi bảo mật của trang chứa ảnh.\n Vui lòng thay đổi link ảnh hoặc tải ảnh lên.");
        });
    }

    const uploadProps: UploadProps = {
        beforeUpload: (file) => {
            const isPNGJPG = file.type === 'image/png' || 'image/jpg';
            if (!isPNGJPG) {
                message.error(`${file.name} không hợp lệ, vui lòng chọn ảnh đuôi .png/.jpg.`);
            }
            return isPNGJPG || Upload.LIST_IGNORE;
        },
        onChange: (info) => {
            if (info.fileList != null && info.fileList.length > 0) {
                setFirstImageUrl('')
                setFileInput(info.file.originFileObj);
            }
            // setFirstImageUrl('')
            console.log(info.fileList);
        },
        multiple: false,
        maxCount: 1
    };

    const uploadTestProps: UploadProps = {
        beforeUpload: (file) => {
            const isXlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            if (!isXlsx) {
                message.error(`${file.name} không hợp lệ, vui lòng chọn file đuôi .xlsx.`);
            }
            return isXlsx || Upload.LIST_IGNORE;
        },
        onChange: (info) => {

            const parseExcelToJson = (file: File) => {
                const reader = new FileReader();
                reader.onload = (e) => {

                    const data = e.target?.result;
                    const workbook = XLSX.read(data, { type: 'binary' });
                    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    const outputJson = {
                        documentId: documentTestId,
                        title: documentTitle,
                        questions: [],
                        type: testType
                    };
                    console.log(jsonData)
                    jsonData[0] = jsonData[0].map((item) => item.toString().toUpperCase().trim());
                    for (let i = 1; i < jsonData.length; i++) {
                        if (jsonData[i][0] == null || jsonData[i][0] == '') break;
                        const question = jsonData[i][0];
                        let questionType = jsonData[i][1]?.toString()?.toUpperCase().trim();
                        if (questionType.toString().toUpperCase() == 'FILL-IN-THE-BLANK') {
                            questionType = 'FILL_IN_THE_BLANK';
                        }
                        if (questionType.toString().toUpperCase() == 'MULTIPLE CHOICE') {
                            questionType = 'MULTIPLE_CHOICE';
                        }
                        const choices = [];
                        const hints = [];
                        const answerHints = [];

                        for (let j = 2; jsonData[0][j].includes('OPTION'); j++) {
                            if (jsonData[i][j]) {
                                choices.push({
                                    content: jsonData[i][j],
                                    isAnswer: false
                                });
                            }
                        }

                        const correctAnswerColumnIndex = jsonData[0].indexOf(('Correct Answer').toUpperCase());
                        const correctAnswer = jsonData[i][correctAnswerColumnIndex];
                        if (correctAnswer) {
                            correctAnswer.toString().split(',').forEach((choiceIndex, index) => {
                                choices[parseInt(choiceIndex) - 1].isAnswer = true;
                            });
                        }

                        const hintColumnIndex = jsonData[0].indexOf(('HINT').toUpperCase());
                        console.log("header: " + jsonData[0])
                        console.log("hintCI: " + hintColumnIndex)
                        if (jsonData[i][hintColumnIndex]) {
                            hints.push({
                                content: jsonData[i][hintColumnIndex]
                            });
                        }
                        const answerHintColumnIndex = hintColumnIndex + 1;
                        if (jsonData[i][answerHintColumnIndex]) {
                            answerHints.push({
                                content: jsonData[i][answerHintColumnIndex]
                            });
                        }

                        const questionObj = {
                            question,
                            type: questionType,
                            choices,
                            hints,
                            answerHints
                        };

                        outputJson.questions.push(questionObj);
                    }

                    console.log(outputJson);
                    setTestData(outputJson);
                };
                reader.readAsBinaryString(file);
            };

            // ...

            const file = info.file.originFileObj;
            parseExcelToJson(file);

        },
        multiple: false,
        maxCount: 1
    };

    return (
        <div className='flex gap-5'>
            <div className='w-1/3 mt-4'>
                <FormProvider {...methods}  >
                    <form
                        onSubmit={e => e.preventDefault()}
                        noValidate
                        className="container"
                    >
                        <div className='flex flex-col  pl-4 '>
                            <div className='flex-1 flex mb-4'>
                                <div className='flex-1 flex  mr-2'>
                                    <div className='mr-2 font-bold'>Notion page&apos;s Id:</div>
                                    <input
                                        required={true}
                                        className='flex-auto border-b-[1px] border-black focus:outline-none'
                                        type="text"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        placeholder="Nhập id của trang Notion cần tải..."
                                    />
                                    <Button loading={isLoading} onClick={handleLoadDocument}>Tải trang</Button>
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
                                        placeholder={TITLE_PLACEHOLDER}
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
                                        placeholder={SHORT_DESCRIPTION_PLACEHOLDER}
                                    />
                                </div>
                            </div>
                            <div className='flex-1 flex mb-4'>
                                <div className='flex-1 flex  mr-2'>
                                    <div className='mr-2 font-bold'>Link ảnh:</div>
                                    <input
                                        className='flex-auto border-b-[1px] border-black focus:outline-none'
                                        type="text"
                                        value={firstImageUrl}
                                        onChange={(e) => {
                                            setFileInput(null)
                                            setFirstImageUrl(e.target.value)
                                        }}
                                        placeholder=""
                                    />
                                </div>
                                <Button loading={isLoadingCheckImage} onClick={handleCheckImageSaveAbility}>Kiểm tra</Button>
                            </div>
                            <div className='flex-1 flex mb-4'>
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                </Upload>
                            </div>

                            <div className='flex-1 flex mb-4'>
                                <div className='flex-1 flex  mr-2'>
                                    <div className='mr-2 font-bold'>Thể loại:</div>
                                    <Select onChange={(val) => setTopic(val)} defaultValue={'Văn hóa'}>
                                        <Select.Option value="CULTURE">Văn hóa</Select.Option>
                                        <Select.Option value="POLITICS">Chính trị</Select.Option>
                                        <Select.Option value="ECONOMY">Kinh tế</Select.Option>
                                        <Select.Option value="EDUCATION">Giáo dục</Select.Option>
                                        <Select.Option value="LAW">Pháp luật</Select.Option>
                                        <Select.Option value="MEDICAL">Y tế</Select.Option>
                                        <Select.Option value="SPORT">Thể thao</Select.Option>
                                        <Select.Option value="LIFE_ENTERTAINMENT">Đời sống - Giải trí</Select.Option>
                                        <Select.Option value="SCIENCE_TECHNOLOGY">Khoa học - Công nghệ</Select.Option>
                                        <Select.Option value="ENVIRONMENT">Môi trường</Select.Option>
                                    </Select>

                                </div>
                                <div className='flex-1 flex  mr-2'>
                                    <div className='mr-2 font-bold'>Dạng thức</div>
                                    <Select style={{ width: 120 }} onChange={(val) => setType(val)} defaultValue={'Chữ'}>
                                        <Select.Option value="TEXT">Chữ</Select.Option>
                                        <Select.Option value="AUDIO">Âm thanh</Select.Option>
                                        <Select.Option value="INFOGRAPHIC">Infographic</Select.Option>
                                        <Select.Option value="IMAGES">Ảnh</Select.Option>
                                        <Select.Option value="VIDEO">Video</Select.Option>

                                        {/* <Select.Option value="SPORT">Thể thao</Select.Option>
                                <Select.Option value="TOURISM">Du lịch</Select.Option> */}
                                    </Select>
                                </div>
                            </div>

                            {/* <div className='flex-1 flex mb-4'>
                                <div className='mr-2 font-bold'>Id document:</div>
                                <input
                                    className='flex-auto border-b-[1px] border-black focus:outline-none'
                                    type="number"
                                    value={documentTestId}
                                    onChange={(e) => {
                                        setDocumentTestId(e.target.value)
                                    }}
                                    placeholder=""
                                />
                                <Upload {...uploadTestProps}>
                                    <Button icon={<UploadOutlined />}>Tải file test lên</Button>
                                </Upload>
                                <Select onChange={(val) => setTestType(val)} defaultValue={'Đọc hiểu'}>
                                    <Select.Option value="MULTIPLE_CHOICE">Đọc hiểu</Select.Option>
                                    <Select.Option value="WRITING">Viết</Select.Option>
                                </Select>
                                <Button loading={isLoadingCreateTest} onClick={async () => {
                                    const req = { ...testData, documentId: parseInt(documentTestId), type: testType }
                                    console.log(req)
                                    setIsLoadingCreateTest(true)
                                    const res = await callCreateTest(req).then((res) => {
                                        console.log(res)
                                        setIsLoadingCreateTest(false)
                                        alert("Tạo bài test thành công")
                                    }).catch((error) => {
                                        console.error('Error fetching data:', error);
                                        setIsLoadingCreateTest(false)
                                        alert("Tạo bài test thất bại" + error)
                                    });

                                    setIsLoadingCreateTest(false)

                                }}>Test</Button>
                            </div> */}




                            <Button type="default"
                                className='text-purple_1 border-purple_1 hover:bg-purple_1 hover:text-white'
                                loading={isLoadingSubmit}
                                onClick={onSubmit}>Đăng
                            </Button>
                        </div>
                    </form>
                </FormProvider>

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
                <div className='flex justify-center pl-[2vw] mt-10 h-[400px] mb-10'>
                    <DocumentPreview props={
                        {
                            data: data, url: fileInput ? URL.createObjectURL(fileInput) : (firstImageUrl != '' ? firstImageUrl : IMAGE_PLACEHOLDER),
                            // data: data, url: (firstImageUrl != '' ? firstImageUrl : IMAGE_PLACEHOLDER),
                            veryFirstText: veryFirstText == '' ? SHORT_DESCRIPTION_PLACEHOLDER : veryFirstText,
                            title: documentTitle == '' ? TITLE_PLACEHOLDER : documentTitle
                        }} />
                </div>
                <div className='border h-screen overflow-scroll'>
                    {data ? (
                        <div>

                            <NotionRenderer blockMap={data} fullPage hideHeader />
                        </div>
                    )
                        : <div className='flex justify-center items-center h-full'>Xem trước</div>}
                </div>
            </div>
        </div>
    );
};

export default Index;





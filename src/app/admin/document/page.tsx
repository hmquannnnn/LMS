"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetDocumentsDetail, callDeleteDocumentById } from "@/apis/documentsAPI";
import React from 'react';
import { Button, FloatButton, Space, Table, Tag, Tabs } from 'antd';
import type { TableColumnsType, TableProps, TabsProps } from 'antd';
import { DeleteOutlined, EditOutlined, FileAddOutlined } from '@ant-design/icons';
import { Allerta } from "next/font/google";

interface DocumentHeader {
    id: string;
    title: string;
    author: string;
    postTime: string;
    type: string;
    topic: string;
}

function getDate(date: string) {
    // ngày/tháng/năm
    const dateArray = date.split("T");
    const dateArray2 = dateArray[0].split("-");
    const year = dateArray2[0];
    const month = dateArray2[1];
    const day = dateArray2[2];
    return `${day}/${month}/${year}`;
}

const DocumentPage = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const router = useRouter();
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            try {
                callGetDocumentsDetail(null, null).then((res) => {
                    setData(res);
                    setSearchResult(res);
                    console.log(res);
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

    }, []);

    const onChange = (key: string) => {
        console.log(key);
    };

    const handleDeleteDocumentById = async (event, documentId) => {
        // alert(documentId)
        event.stopPropagation();
        let text = "Bạn có thực sự muốn xóa ngữ liệu không?";
        if (confirm(text) == true) {
            const res = await callDeleteDocumentById(documentId);
            if (res.status == "ok") {
                alert("Xóa ngữ liệu thành công!");
                setData(data.filter((document) => document.id !== documentId));
                setSearchResult(searchResult.filter((document) => document.id !== documentId));
                //   // window.location.href = "/library";
            } else {
                alert("Xóa ngữ liệu thất bại! " + res.message);
            }
        } else {
            text = "You canceled!";
        }
    }

    const getDataByType = (type: string) => {
        let dataByType: any[] = [];
        if (type === 'topic') {
            let topics = data.map((document) => document.topic);
            topics = [...new Set(topics)];
            topics.forEach((topic) => {
                let totalDocuments = 0;
                let totalLiked = 0;
                data.forEach((document) => {
                    if (document.topic === topic) {
                        totalDocuments++;
                        totalLiked += document.numberOfLikes;
                    }
                });
                dataByType.push({ id: 0, topic: topic, totalDocuments: totalDocuments, totalLiked: totalLiked });
            });
        } else if (type === 'author') {
            let authors = data.map((document) => document.author);
            authors = authors.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
            authors.forEach((author) => {
                let totalDocuments = 0;
                let totalLiked = 0;
                data.forEach((document) => {
                    if (document.author.id === author.id) {
                        totalDocuments++;
                        totalLiked += document.numberOfLikes;
                    }
                });
                dataByType.push({ id: 0, author: author, totalDocuments: totalDocuments, totalLiked: totalLiked });
            });
        } else if (type === 'type') {
            let types = data.map((document) => document.type);
            types = [...new Set(types)];
            console.log(types);
            types.forEach((type) => {
                let totalLiked = 0;
                let totalDocuments = 0;
                data.forEach((document) => {
                    if (document.type === type) {
                        totalLiked += document.numberOfLikes;
                        totalDocuments++;
                    }
                });
                dataByType.push({ id: 0, document: type, totalLiked: totalLiked, totalDocuments: totalDocuments });
                // sort theo totalLiked
            });
        }
        dataByType.sort((a, b) => b.totalLiked - a.totalLiked);
        dataByType = dataByType.slice(0, 10);
        // update id from 1 to 10
        dataByType.forEach((element, index) => {
            element.id = index + 1;
        });
        return dataByType;
    }

    const floatButton: React.FC = () => {
        return (
            <FloatButton
                icon={<FileAddOutlined />}
                onClick={() => {
                    router.push('/library/create-document');
                }}
            />
        );
    }

    const rankColumns = (type: string) => {
        let columns: TableColumnsType<never> | { title: string; dataIndex: string; key: string; width: string; render: (rank: number) => React.JSX.Element; }[] | undefined = [];
        if (type === 'topic') {
            columns = [
                // {
                //     title: '#',
                //     dataIndex: 'id',
                //     key: 'id',
                //     // width: '5%',
                //     render: (id: number) => (
                //         <span>{id}</span>
                //     ),
                // },
                {
                    title: 'Topic',
                    dataIndex: 'topic',
                    key: 'topic',
                    // width: '10%',
                    render: (text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined) => <div className="text-wrap overflow-hidden text-xs">{text}</div>,
                },
                {
                    title: 'Total Documents',
                    dataIndex: 'totalDocuments',
                    key: 'totalDocuments',
                    // width: '15%',
                    render: (totalDocuments: number) => (
                        <span>{totalDocuments}</span>
                    ),
                },
                {
                    title: 'Total Liked',
                    dataIndex: 'totalLiked',
                    key: 'totalLiked',
                    // width: '15%',
                    render: (totalLiked: number) => (
                        <span>{totalLiked}</span>
                    ),
                }
            ];
        }
        if (type === 'author') {
            columns = [
                {
                    title: '#',
                    dataIndex: 'id',
                    key: 'id',
                    width: '5%',
                    render: (id: number) => (
                        <span>{id}</span>
                    ),
                }, {
                    title: 'Author',
                    dataIndex: 'author',
                    key: 'author',
                    // width: '15%',
                    render: (author: any) => (
                        <Space size="middle">
                            <span>{author.firstName}</span>
                            <span>{author.lastName}</span>
                        </Space>
                    ),
                },
                {
                    title: 'Total Documents',
                    dataIndex: 'totalDocuments',
                    key: 'totalDocuments',
                    width: '15%',
                    render: (totalDocuments: number) => (
                        <span>{totalDocuments}</span>
                    ),
                }
            ];
        }
        if (type === 'type') {
            columns = [
                {
                    title: '#',
                    dataIndex: 'id',
                    key: 'id',
                    width: '5%',
                    render: (id: number) => (
                        <span>{id}</span>
                    ),
                },
                {
                    title: 'Document',
                    dataIndex: 'document',
                    key: 'document',
                    width: '30%',
                    render: (text) => <a>{text}</a>,
                },
                {
                    title: 'Total Documents',
                    dataIndex: 'totalDocuments',
                    key: 'totalDocuments',
                    width: '15%',
                    render: (totalDocuments: number) => (
                        <span>{totalDocuments}</span>
                    ),
                },
                {
                    title: 'Total Liked',
                    dataIndex: 'totalLiked',
                    key: 'totalLiked',
                    width: '15%',
                    render: (totalLiked: number) => (
                        <span>{totalLiked}</span>
                    ),
                }
            ];
        }
        return columns
    }

    const childrenTab: React.FC = (type) => {
        return (
            <div className="overflow-auto">
                <Table
                    columns={rankColumns(type as string)}
                    dataSource={getDataByType(type as string)}
                    rowKey={(record) => record.id}
                    // show only top 10 documents so unable to change page
                    pagination={false}

                />
            </div>
        );
    }



    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Topic',
            children: childrenTab('topic'),
        },
        {
            key: '2',
            label: 'Author',
            children: childrenTab('author'),
        },
        {
            key: '3',
            label: 'Type',
            children: childrenTab('type'),
        },
    ];

    const Raking: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

    const columns: TableProps<DocumentHeader>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '7%',
            render: (id: string) => (
                <span>{id}</span>
            ),


        },
        {
            // dai qua thi phai dung ellipsis
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '33%',
            ellipsis: true,
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            width: '15%',
            render: (author: any) => (
                <Space size="middle">
                    <span>{author.firstName}</span>
                    <span>{author.lastName}</span>
                </Space>
            ),
        },
        {
            title: 'Post Time',
            dataIndex: 'postTime',
            key: 'postTime',
            width: '10%',
            sorter: (a, b) => new Date(a.postTime).getTime() - new Date(b.postTime).getTime(),
            render: (postTime: string) => (
                <span>{getDate(postTime)}</span>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '10%',
            filters: [
                {
                    text: 'TEXT',
                    value: 'TEXT',
                },
                {
                    text: 'VIDEO',
                    value: 'VIDEO',
                },
                {
                    text: 'AUDIO',
                    value: 'AUDIO',
                },
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
            render: (type: string) => {
                let color = 'geekblue';
                if (type === 'TEXT') {
                    color = 'green';
                }
                if (type === 'VIDEO') {
                    color = 'volcano';
                }
                if (type === 'AUDIO') {
                    color = 'yellow';
                }
                return (
                    <Tag color={color} key={type}>
                        {type.toUpperCase()}
                    </Tag>
                );
            }
        },
        {
            title: 'Topic',
            dataIndex: 'topic',
            key: 'topic',
            width: '10%',
            render: (topic: string) => (
                <span>{topic}</span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: '0%',
            render: (text, record) => (
                <Space size="middle">
                    {/* <Button
            type="primary"
            // center the icon
            className="flex items-center justify-center"
            onClick={() => router.push(`/admin/document/edit/${record.id}`)}
          >
            <EditOutlined />
          </Button> */}

                    <Button
                        type="primary"
                        danger
                        // center the icon
                        className="flex items-center justify-center"
                        onClick={(event) => handleDeleteDocumentById(event, record.id)}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    function removeVietnameseTones(str: string) {
        str = str.toLowerCase();
        // Special characters
        str = str.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a');
        str = str.replace(/[èéẹẻẽêềếệểễ]/g, 'e');
        str = str.replace(/[ìíịỉĩ]/g, 'i');
        str = str.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o');
        str = str.replace(/[ùúụủũưừứựửữ]/g, 'u');
        str = str.replace(/[ỳýỵỷỹ]/g, 'y');
        str = str.replace(/đ/g, 'd');
        // Lowercase
        str = str.toLowerCase();
        // Trim the last whitespace
        str = str.trim();
        // Change whitespace to "-"
        str = str.replace(/\s+/g, '-');
        return str;
    }
    const search = (data: any, key: string) => {
        let result: any[] = [];
        data.forEach((element: any) => {
            if (removeVietnameseTones(element.title).includes(removeVietnameseTones(key))
                || removeVietnameseTones(element.author.firstName).includes(removeVietnameseTones(key))
                || removeVietnameseTones(element.author.lastName).includes(removeVietnameseTones(key))
                || removeVietnameseTones(element.topic).includes(removeVietnameseTones(key))) {
                result.push(element);
            }
        });
        if (key === "") {
            return data;
        }
        return result;
    }
    return (
        // divide into left side and right side
        // left side: giving statistics
        // right side: table of documents
        <div className="flex flex-row">
            <div className="w-[28%]">
                <div className="flex flex-col">
                    <div className="rounded-lg bg-white shadow-lg p-4 mx-4">
                        {Raking(data)}
                    </div>
                </div>
            </div>
            <div className="w-[72%] position-relative r-0">
                <div className="rounded-lg bg-white shadow-lg p-4">
                    <div className="flex justify-center items-center m-4">
                        <input
                            className="border border-gray-400 rounded-lg p-2 w-1/2"
                            type="text"
                            placeholder="Search"
                            onChange={(e) => {
                                setSearchResult(search(searchResult, e.target.value));
                                if (e.target.value === "") {
                                    setSearchResult(data);
                                }
                            }}
                        />
                    </div>

                    <div className="rounded-lg bg-white shadow-lg m-4">
                        <Table
                            columns={columns}
                            dataSource={searchResult}
                            rowKey={(record) => record.id}
                            pagination={{ pageSize: 10 }}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
                                        router.push(`/library/${record.id}`);
                                    },
                                };
                            }}
                        />
                    </div>
                </div>
            </div>
            {floatButton()}
        </div>
    );
}
export default DocumentPage;
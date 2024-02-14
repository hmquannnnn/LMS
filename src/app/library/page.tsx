'use client'
import { useEffect, useState, useRef } from "react";
import { callGetDocuments } from "@/apis/documentsAPI";
import DocumentPreview from "@/app/library/documentPreview";

const MEDIA_URL = "http://localhost:10049/api/v1/media/";
const Library = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                callGetDocuments(null).then((res) => {
                    setData(res);
                    console.log(res);

                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <>

            <div>
                {
                    data.length > 0 &&
                    <div className="flex justify-between py-[10vh] px-[15vw]">

                        <div className="w-min text-xs">
                            {data.filter((item, index) => index >= 1 && index <= 2).map((item) => {
                                return (
                                    <div key={item.id} className="mb-14">
                                        <DocumentPreview props={{ data: item, imgWidth: "300px", imgHeight: "200px", imgUrl: item?.thumbnail?.id ? (MEDIA_URL + item?.thumbnail?.id) : "https://placehold.co/300x200" }}></DocumentPreview>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="w-min text-center text-md">
                            <DocumentPreview props={{ data: data[0], imgWidth: "600px", imgHeight: "400px", imgUrl: data[0]?.thumbnail?.id ? (MEDIA_URL + data[0]?.thumbnail?.id) : "https://placehold.co/600x400" }}></DocumentPreview>
                        </div>
                        <div className="w-min text-xs">
                            {data.filter((item, index) => index >= 3 && index <= 20).map((item) => {
                                return (
                                    <div key={item.id} className="mb-14">
                                        <DocumentPreview props={{ data: item, imgWidth: "300px", imgHeight: "200px", imgUrl: item?.thumbnail?.id ? (MEDIA_URL + item?.thumbnail?.id) : "https://placehold.co/300x200" }}></DocumentPreview>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>


        </>
    );
}

export default Library;
"use client";
import { useEffect, useState } from "react";
import { callGetDocuments } from "@/apis/documentsAPI";
import DocumentPreview from "@/app/library/documentPreview";
import { Spin } from "antd";
import HeaderWithLogo from "@/components/headerWithLogo";
import Image from "next/image";

const MEDIA_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/media/";
const Library = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        callGetDocuments(null, null).then((res) => {
          setData(res);
          console.log(res);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={"bg-sky"}>
        <HeaderWithLogo />

        <Image src="/public\image\background_home.png" width={1920} height={1080} alt="library-background" />

        {data.length == 0 && (
          <div className="w-full flex justify-center h-screen mt-[50vh]">
            <Spin />
          </div>
        )}
        {data.length > 0 && (
          <div className="flex flex-wrap justify-between  px-[15vw]">
            <div className="w-min text-xs">
              {data
                .filter((item, index) => index >= 1 && index <= 3)
                .map((item) => {
                  return (
                    <div key={item.id} className="mb-14">
                      <DocumentPreview
                        props={{
                          data: item,
                          imgWidth: "300px",
                          imgHeight: "200px",
                          imgUrl: item?.thumbnail?.id
                            ? MEDIA_URL + item?.thumbnail?.id
                            : "https://placehold.co/300x200",
                        }}
                      ></DocumentPreview>
                    </div>
                  );
                })}
            </div>
            <div className="w-min text-center text-md">
              {data
                .filter((item, index) => index >= 4 && index <= 5)
                .map((item) => {
                  return (
                    <div key={item.id} className="mb-14">
                      <DocumentPreview
                        props={{
                          data: item,
                          imgWidth: "600px",
                          imgHeight: "400px",
                          imgUrl: item?.thumbnail?.id
                            ? MEDIA_URL + item?.thumbnail?.id
                            : "https://placehold.co/300x200",
                        }}
                      ></DocumentPreview>
                    </div>
                  );
                })}
            </div>
            <div className="w-min text-xs">
              {data
                .filter((item, index) => index >= 6 && index <= 20)
                .map((item) => {
                  return (
                    <div key={item.id} className="mb-14">
                      <DocumentPreview
                        props={{
                          data: item,
                          imgWidth: "300px",
                          imgHeight: "200px",
                          imgUrl: item?.thumbnail?.id
                            ? MEDIA_URL + item?.thumbnail?.id
                            : "https://placehold.co/300x200",
                        }}
                      ></DocumentPreview>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Library;

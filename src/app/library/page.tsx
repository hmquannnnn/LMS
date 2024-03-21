"use client";
import { useEffect, useState } from "react";
import { callGetDocumentsDetail } from "@/apis/documentsAPI";
import DocumentPreview from "@/app/library/documentPreview";
import { Spin } from "antd";
import Image from "next/image";
import { MainTitle } from "./MainTitle";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MEDIA_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/media/";
// const MEDIA_URL = "/api/v1/media/";

const Library = () => {

  const [data, setData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        callGetDocumentsDetail(null, null).then((res) => {
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
        {/* <HeaderWithLogo /> */}
        <div className="w-full relative flex justify-end">
          {/* <div className="absolute bottom-0 left-0">
            <div className="font-iciel flex text-purple_1">
              <div className="flex items-center">
                <div className="text-[200px] leading-[65px]">TH</div>
              </div>
              <div className="flex flex-col justify-end">
                <div className="text-[65px] leading-[65px]">
                  Ư VIỆN
                </div>
                <div className="text-[65px] leading-[65px]">
                  ÔNG TIN
                </div>
              </div>
            </div>
          </div> */}
          <div className="absolute bottom-[42%] left-[10%]">
            <MainTitle />
          </div>
          <div className="w-3/4">
            <Image className="object-contain" src="/images/background_home.svg" width={1920} height={1080} alt="library-background" />
          </div>
        </div>


        {data.length == 0 && (
          <div className="w-full flex justify-center h-screen mt-[50vh]">
            <Spin />
          </div>
        )}

        {data.length > 0 && (
          <div className="flex flex-wrap justify-between mt-24">
            <div className="">
              {data
                // .filter((item, index) => index >= 1 && index <= 3)
                .map((item, index) => {
                  return (
                    <div key={item.id} className="mb-28 px-[8vw]">
                      <DocumentPreview
                        props={{
                          data: item,
                          imgWidth: "300px",
                          imgHeight: "200px",
                          imgUrl: item?.thumbnail?.id
                            ? MEDIA_URL + item?.thumbnail?.id
                            : "https://placehold.co/300x200",
                          isOddIndex: (index % 2 !== 0)
                        }}
                      ></DocumentPreview>
                    </div>
                  );
                })}
            </div>
            {/* <div className="w-min text-center text-md">
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
            </div> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Library;

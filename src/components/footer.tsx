"use client";
import { Col, Row } from "antd";
import Image from "next/image";
const Footer = () => {
  return (
    <>
      <div
        className={" flex flex-wrap bg-blue_12 w-full pt-10 px-[10%] mt-10 pb-20"}
      >
        <div
          className={"flex flex-col items-stretch justify-start lg:pr-16 relative lg:w-1/2 w-full mb-5"}
        >
          <h3
            className={"text-left font-bold text-xl text-blue_10 self-start mb-4"}
          // style={{ position: "absolute", top: "0", left: "0" }}
          >
            VỀ DỰ ÁN

          </h3>
          <div>
            <p className={" font-timesNewRoman text-blue_11 mb-4 text-justify"}>
              Dạy học tích hợp là một quan điểm dạy học hiện đại đã và đang được áp dụng một cách phổ biến trong chương trình giáo dục phổ thông các nước, trong đó có Việt Nam; với mục đích gắn kết đào tạo với thực tiễn; hình thành các phẩm chất, năng lực chung và năng lực đặc thù cho người học, hình thành các năng lực nghề nghiệp cho học sinh. Mặt khác, Chương trình giáo dục phổ thông môn Ngữ văn 2018 đánh giá cao vai trò của văn bản thông tin trong việc phát triển năng lực đọc, viết, nói và nghe cho người học. Nghiên cứu về những tính chất đặc thù của loại văn bản này, nhóm chúng tôi nhận thấy những điểm lợi thế cũng như tính khả thi của việc dạy học phát triển năng lực đọc, viết, nói và nghe văn bản thông tin tích hợp giáo dục hướng nghiệp cho học sinh. Qua đó, nhóm tiến hành xây dựng trang web Đèn Sách theo định hướng tích hợp đã nêu trên. Từ đó đáp ứng các yêu cầu về năng lực và phẩm chất của cả 02 phân môn chính: Ngữ văn và Hoạt động trải nghiệm, hướng nghiệp.
            </p>
          </div>
          <div className={"text-blue_10 "}>
            <div
              className={
                "flex flex-row items-center justify-items-start text-left"
              }
            >
              <img src="/footer/Tel.svg" alt="" className={"h-5 w-5 mr-3"} />
              <p>0843125588</p>
            </div>
            <div className={"flex flex-row items-center justify-items-start"}>
              <img src="/footer/Mail.svg" alt="" className={"h-5 w-5 mr-3"} />
              <p>dnbinh03@gmail.com</p>
            </div>
            <div className={"flex flex-row items-center justify-items-start"}>
              <img
                src="/footer/Location.svg"
                alt=""
                className={"h-5 w-5 mr-3"}
              />
              <p>136 Đ. Xuân Thủy - P. Dịch Vọng - Q. Cầu Giấy - TP. Hà Nội</p>
            </div>
          </div>
        </div>
        <div className={"lg:w-1/2 w-full"}>
          <h3
            className={
              "text-left font-bold text-xl text-blue_10 place-self-start mb-4"
            }
          >
            VỀ CHÚNG TÔI
          </h3>
          <p className={"text-left text-blue_11 mb-2"}>
            Nhóm sinh viên Nghiên cứu khoa học đến từ Khoa Ngữ văn, Trường Đại
            học Sư phạm Hà Nội.
          </p>
          <div className={"flex sm:flex-row flex-col gap-5 sm:items-start text-blue_10 sm:px-0 px-[18%] mb-2"}>
            <div
              className={
                "flex flex-col justify-center justify-items-center"
              }
            >
              <img
                src="/footer/Huế.jpg"
                alt=""
                className={"sm:h-32 sm:w-32 mb-2 block mx-auto rounded-lg"}
              />
              <p className={"text-center font-xs font-semibold"}>Hà Ngọc Huế</p>
            </div>
            <div
              className={
                "flex flex-col justify-center justify-items-center  "
              }
            >
              <img
                src="/footer/Bình.jpg"
                alt=""
                className={"sm:h-32 sm:w-32 mb-2 block mx-auto rounded-lg"}
              />
              <p className={"text-center font-xs font-semibold"}>
                Đặng Như Bình
              </p>
            </div>
            <div
              className={"flex flex-col justify-center justify-items-center "}
            >
              <img
                src="/footer/Quanh.jpg"
                alt=""
                className={"sm:h-32 sm:w-32 mb-2 block mx-auto rounded-lg"}
              />
              <p className={"text-center font-xs font-semibold"}>
                Nguyễn Quỳnh Anh
              </p>
            </div>
          </div>
          <div className={"flex flex-col justify-items-end justify-end w-full"}>
            <p className={"text-right w-full font-bold text-blue_10"}>
              DENSACH.EDU.VN
            </p>
            <p className={"text-right w-full text-[10px] text-blue_11"}>
              since 2024
            </p>
          </div>
        </div>
      </div >
    </>
  );
};

export default Footer;

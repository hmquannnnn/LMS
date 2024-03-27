"use client";
import { Col, Row } from "antd";

const Footer = () => {
  return (
    <>
      <Row
        className={"h-96 flex items-center bg-blue_12 w-full pt-10 px-28 mt-10"}
      >
        <Col
          span={12}
          className={"flex flex-col items-stretch justify-start pr-16 relative"}
        >
          <h3
            className={"text-left font-bold text-xl text-blue_10 self-start"}
            // style={{ position: "absolute", top: "0", left: "0" }}
          >
            VỀ DỰ ÁN
          </h3>
          <p className={"text-left font-timesNewRoman text-blue_11"}>
            Theo chương trình GDPT 2018, văn bản thông tin (VBTT) là 01 trong 03
            loại văn bản cần giảng dạy cho người học. Nhận thấy đây không chỉ là
            chủ đề góp phần phát triển năng lực, phẩm chất cho HS mà còn có khả
            năng tích hợp các hoạt động trải nghiệm hướng nghiệp, nhóm chúng tôi
            quyết định thực hiện đề tài nghiên cứu "Xây dựng và sử dụng nền tảng
            phát triển năng lực đọc, viết, nói và nghe văn bản thông tin cho học
            sinh lớp 10 theo quan điểm hướng nghiệp". Mục đích của đề tài này là
            xây dựng cơ sở lí luận và thực tiễn, từ đó, thiết lập nền tảng
            website nhằm phát triển năng lực Ngữ văn từ VBTT kết hợp với tổ chức
            hoạt động trải nghiệm hướng nghiệp cho HS.
          </p>
          <div className={"text-blue_10"}>
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
        </Col>
        <Col span={12} className={"grid justify-items-start"}>
          <h3
            className={
              "text-left font-bold text-xl text-blue_10 place-self-start"
            }
          >
            VỀ CHÚNG TÔI
          </h3>
          <p className={"text-left text-blue_11"}>
            Nhóm sinh viên Nghiên cứu khoa học đến từ Khoa Ngữ văn, Trường Đại
            học Sư phạm Hà Nội.
          </p>
          <div className={"flex flex-row justify-items-start text-blue_10"}>
            <div
              className={
                "flex flex-col justify-center justify-items-center mr-5"
              }
            >
              <img
                src="/footer/Huế.jpg"
                alt=""
                className={"h-32 w-32 mb-2 block mx-auto rounded-lg"}
              />
              <p className={"text-center font-xs font-medium"}>Hà Ngọc Huế</p>
            </div>
            <div
              className={
                "flex flex-col justify-center justify-items-center mr-5"
              }
            >
              <img
                src="/footer/Bình.jpg"
                alt=""
                className={"h-32 w-32 mb-2 block mx-auto rounded-lg"}
              />
              <p className={"text-center font-xs font-semibold"}>
                Đặng Như Bình
              </p>
            </div>
            <div
              className={"flex flex-col justify-center justify-items-center"}
            >
              <img
                src="/footer/Quanh.jpg"
                alt=""
                className={"h-32 w-32 mb-2 block mx-auto rounded-lg"}
              />
              <p className={"text-center font-xs font-bold"}>
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
        </Col>
      </Row>
    </>
  );
};

export default Footer;

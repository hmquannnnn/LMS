"use client";
import { Col, Row } from "antd";

const Footer = () => {
  return (
    <>
      <Row className={"mx-auto w-7/12 h-40 justify-between mt-5"}>
        <div className={"my-auto"}>
          <img className={"h-40"} src={"/bha.png"} />
        </div>
        <Col className={"grid my-auto justify-items-end"}>
          <p>Tổng biên tập: Bình - Huế - Anh</p>
          <p>Trụ sở chính: 136 Xuân Thủy - Dịch Vọng - Cầu Giấy - Hà Nội</p>
          <p>Tel: 0987654321</p>
          <p>Email: email@gmail.com</p>
        </Col>
      </Row>
    </>
  );
};

export default Footer;

"use client"
import { Col, Row } from "antd";

const Footer = () => {
    return (
        <>
            <Row className={"mx-auto w-7/12 h-40 justify-between "}>
                <div className={"my-auto"}>
                    <img className={"h-40"} src={"https://ci3.googleusercontent.com/meips/ADKq_NYvsFUz9YsELnYBj-0UsyFFOSji6bK0v8_37WmQHyvZKxHqnVLyzMJPvGrvWvQ6Sn9uhC0hYizX-d_-fWhh-iJSofUQsGVoOpawjPikPg4CwrUQhe6pgOeev1kRAWe_QqnmEohVqAPb9IcY624C_HwX7qXJQC0=s0-d-e1-ft#https://cdn.freelogodesign.org/files/1e0553af35e44a65897c7b3ac6b68ca8/thumb/logo_200x200.png?v=0"} />
                </div>
                <Col className={"grid my-auto justify-items-end"}>
                    <p>Tổng biên tập: Bình - Huế - Anh</p>
                    <p>Trụ sở chính: 136 Xuân Thủy - Dịch Vọng - Cầu Giấy - Hà Nội</p>
                    <p>Tel: 0987654321</p>
                    <p>Email: email@gmail.com</p>
                </Col>
            </Row>
        </>
    )
}

export default Footer;
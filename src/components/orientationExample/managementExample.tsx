"use client";

import { FaRegHandPointRight } from "react-icons/fa";

const ManagementExample = ({ color }) => {
  return (
    <>
      <div className={"flex flex-row items-end"}>
        <img className={"mr-20 w-[500px]"} src={"/images/quanly/quanly.svg"} />
        <div>
          <p className={"text-2xl font-bold mb-5"}>QUẢN LÝ</p>
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Hãy tự tin và dũng cảm trở thành trưởng nhóm học tập trong lớp để
              có thể hoàn thành tốt các nhiệm vụ được giao. Các nhiệm vụ này em
              có thể tham khảo từ năm nhóm còn lại. Sát sao quá trình và kết quả
              làm việc nhóm của mỗi thành viên từ đó nhận xét và rút kinh nghiệm
              cho nhóm cũng như chính bản thân em.
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Tưởng tượng em là quản lý nhân sự của một công ty. Hôm nay, công
              ty một buổi gặp gỡ nhân viên mới. Em hãy thiết kế một văn bản
              thông tin theo hình thức phù hợp để giới thiệu về cơ cấu tổ chức
              của công ty mình.
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Tại nhà trường đang tổ chức một hoạt động trải nghiệm kĩ năng
              sống. Hãy đóng vai một người quản lý giáo dục, thiết kế một văn
              bản thông tin theo hình thức phù hợp để giới thiệu với học sinh về
              hoạt động đó.
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Chuỗi khách sạn em quản lý hiện tại đang gặp rắc rối vì khách hàng
              không hài lòng với những trải nghiệm làm tiệc cưới hay tiệc cuối
              năm của công ty. Em hãy hoá thân thành một người quản lí khách sạn
              chuyên nghiệp và thiết kế một văn bản thông tin theo hình thức phù
              hợp để lên một kế hoạch tổ chức một buổi tiệc cuối năm khác.
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Đóng vai một người quản lý tài chính trong một công ty bán mỹ
              phẩm, em hãy thiết kế một văn bản thông tin theo hình thức phù hợp
              để giới thiệu giá cả biến động của một sản phẩm trong công ty để
              trình đơn lên ban giám đốc
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Đóng vai công an trong phường, hiện nay phường em phụ trách quản
              lý đang có hiện tượng ăn trộm, ăn cắp. Hãy thiết kế một văn bản
              thông tin theo hình thức phù hợp để thông báo tới người dân cần
              cảnh giác.
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Là một thanh tra giáo dục, hôm nay là ngày em cần nộp bản báo cáo
              về một lớp học cụ thể trong 1 tháng em theo dõi. Hãy viết một bản
              báo cáo để trình bày kết quả theo dõi của mình với ban giám hiệu
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementExample;

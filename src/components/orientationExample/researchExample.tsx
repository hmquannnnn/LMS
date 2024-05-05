"use client";

import { FaRegHandPointRight } from "react-icons/fa";

const ResearchExample = ({ color }) => {
  return (
    <>
      <div className={"flex flex-row items-end my-10"}>
        <img
          className={"mr-5 w-[500px]"}
          src={"/images/nghiencuu/khoahoctunhien.svg"}
        />
        <div>
          <p className={"text-2xl font-bold mb-5 mr-1"}>
            KHOA HỌC TỰ NHIÊN{" "}
            <i className={"font-bold mb-5 text-base"}>
              (Vật lý học, Hóa học, Toán học, Thiên văn học, Sinh vật học, Sinh
              thái học, Động vật học, Công nghệ sinh học, Khí tượng thủy văn,
              Công nghệ thực phẩm, Chuyên gia dinh dưỡng, Môi trường học, …)
            </i>
          </p>

          <p className={"mb-5"}>
            Khoa học tự nhiên với nhiệm vụ nghiên cứu lý giải các sự vật, hiện
            tượng, quy luật xảy ra trong tự nhiên, từ đó xây dựng các luận cứ,
            giải pháp làm cơ sở xây dựng những công trình ứng dụng cũng như sử
            dụng những lợi thế tự nhiên đem lại. Nó góp phần cải tạo và nâng cao
            chất lượng cuộc sống, bảo vệ con người trước những tác động tiêu cực
            của tự nhiên đến con người và môi trường sống của mình.
          </p>
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Từ kho tài nguyên thư viện, hãy lựa chọn “nghiên cứu” một vấn đề
              thuộc một chuyên ngành cụ thể em yêu thích trong nhóm ngành này và
              thể hiện kết quả nghiên cứu của em dưới hình thức một bài tiểu
              luận/ bài báo tạp chí khoa học/ video hoặc báo cáo thực nghiệm/ …
            </p>
          </div>
        </div>
      </div>
      <div className={"flex flex-row items-end my-10"}>
        <div>
          <div className={"flex flex-row items-end"}>
            <p className={"text-2xl font-bold mb-5 mr-1"}>
              KHOA HỌC XÃ HỘI{" "}
              <p className={"font-bold mb-5 italic text-base"}>
                (Triết học, Xã hội học, Nhân chủng học, Văn học, Văn hóa học,
                Giáo dục học, Khảo cổ học, Địa lý học, Kinh tế học, Ngôn ngữ
                học, Sử học, …)
              </p>
            </p>
          </div>
          <p className={"mb-5"}>
            Khoa học Xã hội là một nhánh Khoa học nghiên cứu chuyên sâu về hành
            vi con người trong các khía cạnh xã hội và văn hóa. Khối lượng kiến
            thức trong khối ngành này rất rộng: bao gồm các môn khoa học nghiên
            cứu về các phương diện con người của thế giới, các ngành học nghiên
            cứu về văn hóa con người, sử dụng các phương pháp chủ yếu là phân
            tích, lập luận, hoặc suy đoán, và có đáng kể yếu tố lịch sử.
          </p>
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Từ kho tài nguyên thư viện, hãy lựa chọn “nghiên cứu” một vấn đề
              thuộc một chuyên ngành cụ thể em yêu thích trong nhóm ngành này và
              thể hiện kết quả nghiên cứu của em dưới hình thức một bài tiểu
              luận/ bài báo tạp chí khoa học.
            </p>
          </div>
        </div>
        <img
          className={"ml-16 w-[500px]"}
          src={"/images/nghiencuu/khoahocxahoi.svg.png"}
        />
      </div>
    </>
  );
};

export default ResearchExample;

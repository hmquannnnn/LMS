"use client";

import { FaRegHandPointRight } from "react-icons/fa";

const TechniqueExample = ({ color }) => {
  return (
    <>
      <div className={"flex flex-row items-end"}>
        <img className={"mr-5"} src={"/images/kithuat/congnghiep.svg"} />
        <div>
          <p className={"text-2xl font-bold mb-5"}>CÔNG NGHIỆP</p>

          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Sắp tới, văn bản thông tin vừa rồi sẽ được in ấn rộng rãi thành
              các tờ rơi, postcard để phổ biến tới các bạn học sinh. Là một
              chuyên gia công nghệ in ấn, em hãy thiết kế lại văn bản sao cho
              vừa khổ tờ rơi, postcard và làm 01 văn bản giới thiệu các loại
              giấy in ấn để khách hàng lựa chọn nhé!
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Sắp tới, nhóm tác giả văn bản thông tin (bao gồm tác giả bài viết
              em vừa đọc) sẽ cho xuất bản 01 cuốn sách thông tin tổng hợp. Trong
              đó, là một chuyên viên vận hành sản xuất, em hãy lên kế hoạch in
              ấn, sản xuất đảm bảo sao cho giá thành cạnh tranh và chất lượng,
              thời gian tốt nhất cho nhóm tác giả nhé! (Gợi ý: kế hoạch phải cụ
              thể các khâu, thời gian làm việc giữa các công đoạn, chi phí, số
              lượng nhân công,...)
            </p>
          </div>
        </div>
      </div>
      <div className={"flex flex-row items-end"}>
        <img src="/images/kithuat/diendientu.svg" alt="" className={"w-5/12"} />
        <div>
          <p className={"text-2xl font-bold mb-5"}>ĐIỆN, ĐIỆN TỬ</p>
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Sắp tới, văn bản thông tin em vừa đọc sẽ được trình chiếu tại hội
              thảo kết hợp thông tin và công nghệ. Vì thế, tác giả cần 01 kĩ
              thuật viên/lập trình viên máy tính hỗ trợ viết code sao cho khi
              người đọc nhập “xin chào”, máy tính sẽ phản hồi “Chào bạn! Chào
              mừng bạn đến với thế giới văn bản thông tin. Bạn nên đọc văn bản
              [tiêu đề] để hiểu hơn về chúng tôi!”. Là một kĩ thuật viên/lập
              trình viên, em hãy giúp tác giả nhé!
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Tưởng tượng em là một chuyên gia về đồ điện trong tương lai. Ông
              bà em muốn thay một loại đèn chống lóa để tiện xem sách báo, bố mẹ
              lại muốn một loại đèn tự động để tiết kiệm và tiện lợi trong cuộc
              sống nhiều bộn bề, em em là một bạn trẻ yêu sắc màu, thích những
              chiếc đèn nhiều màu sáng khác nhau. Là một chuyên gia, em hãy tìm
              hiểu về các loại đèn và đưa ra lời khuyên trước những yêu cầu này
              nhé! (Hãy viết 01 văn bản thông tin, trình bày rõ ràng, mạch lạc
              để các thành viên trong gia đình đều nắm được)
            </p>
          </div>
        </div>
      </div>
      <div className={"flex flex-row items-end"}>
        <div>
          <p className={"text-2xl font-bold mb-5"}>CƠ KHÍ, XÂY DỰNG, VẬN TẢI</p>
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Sắp tới sẽ có 02 đoàn khách du lịch đến thăm quan địa điểm trong
              văn bản vừa nêu, một đoàn đến từ Hồ Chí Minh, một đoàn từ Hà Nội.
              Là một kĩ sư vận tải, em hãy gợi ý lộ trình phù hợp cho 02 đoàn
              khách đó nhé! Lưu ý, em cần nêu rõ vì sao em lại chọn lộ trình này
              (những con đường khác và con đường em chọn có ưu, nhược điểm gì)
              và đưa ra một số gợi ý để cải thiện tình hình giao thông (mở rộng
              làn đường, mở thêm cao tốc, làm thêm đường,...) cho lộ trình này.
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Sắp tới sẽ có 02 đoàn khách du lịch đến thăm quan địa điểm trong
              văn bản vừa nêu, một đoàn đến từ Hồ Chí Minh, một đoàn từ Hà Nội.
              Là một kĩ sư vận tải, em hãy gợi ý lộ trình phù hợp cho 02 đoàn
              khách đó nhé! Lưu ý, em cần nêu rõ vì sao em lại chọn lộ trình này
              (những con đường khác và con đường em chọn có ưu, nhược điểm gì)
              và đưa ra một số gợi ý để cải thiện tình hình giao thông (mở rộng
              làn đường, mở thêm cao tốc, làm thêm đường,...) cho lộ trình này
            </p>
          </div>
        </div>
        <img
          src="/images/kithuat/cokhixaydungvantai.svg"
          alt=""
          className={"w-5/12"}
        />
      </div>
      <div className={"flex flex-row items-end"}>
        <div>
          <p className={"text-2xl font-bold mb-5"}>NÔNG NGHIỆP, THỰC PHẨM</p>
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Văn bản thông tin vừa rồi có sự xuất hiện của nhiều loại thực vật
              khác nhau, em hãy chọn một loài mà em yêu thích nhất và tìm hiểu
              về nó. Là một kĩ sư nông nghiệp trong tương lai chuẩn bị xuất bản
              sách về các loài cây, em hãy viết vài trang văn bản thông tin để
              giới thiệu về loại cây đó nhé! (Gợi ý: giới thiệu về đặc tính sinh
              học, công dụng, miêu tả ngoại hình,...)
            </p>
          </div>
        </div>
        <img
          src="/images/kithuat/nongnghiepthucpham.svg"
          alt=""
          className={"w-5/12"}
        />
      </div>
    </>
  );
};

export default TechniqueExample;

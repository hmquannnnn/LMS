import React from "react";
import "./evaluation.scss";

const Evaluation = () => {
  return (
    <div className={"flex flex-col w-full"}>
      <h1 className={"text-center font-bold text-3xl mb-10"}>
        BỘ CÔNG CỤ HỖ TRỢ ĐÁNH GIÁ
      </h1>
      <div className={"grid grid-cols-3 text-xs largelaptop:text-base"}>
        <div className={"col-span-1 flex flex-col px-10 justify-center"}>
          <table
            className={
              "w-full h-full border-collapse border border-black py-1 px-3"
            }
          >
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "55%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <tr>
              <th className={"border border-black py-1 px-3"}>Tiêu chí</th>
              <th className={"border border-black py-1 px-3"}>Biểu hiện</th>
              <th className={"border border-black py-1 px-6"}>Có</th>
              <th className={"border border-black py-1 px-3"}>Không</th>
            </tr>
            <tr>
              <th rowSpan={5} className={"border border-black py-1 px-3"}>
                NỘI DUNG
              </th>
              <td className={"border border-black py-1 px-3"}>
                (1) Nhận biết các thông tin có sẵn trong văn bản
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (2) Xác định vai trò của các thông tin có trong văn bản
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (3) Xác định chủ đề của văn bản thông tin
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (4) Phân tích, lí giải nội dung của văn bản bằng kinh nghiệm cá
                nhân
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (5) Kết nối thông tin trong và ngoài văn bản cần thiết cho mục
                đích
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <th rowSpan={5} className={"border border-black py-1 px-3"}>
                HÌNH THỨC
              </th>
              <td className={"border border-black py-1 px-3"}>
                (6) Rút ra thông điệp, ý nghĩa, kinh nghiệm và bài học cá nhân
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (7) Nhận biết được một số dạng văn bản
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (8) Phân tích, lí giải cách trình bày thông tin, cách sử dụng
                các yếu tố hình thức trong từng dạng văn bản
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (9) Đánh giá hiệu quả cách trình bày
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (10) Phát hiện ra điểm chưa phù hợp
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
          </table>
          <p
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Bảng kiểm hỗ trợ kiểm tra đánh giá kĩ năng Đọc hiểu
          </p>
        </div>
        <div className={"col-span-1 flex flex-col px-10 justify-center"}>
          <table
            className={
              "w-full h-full border-collapse border border-black py-1 px-3"
            }
          >
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "55%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <tr>
              <th className={"border border-black py-1 px-3"}>Tiêu chí</th>
              <th className={"border border-black py-1 px-3"}>Biểu hiện</th>
              <th className={"border border-black py-1 px-6"}>Có</th>
              <th className={"border border-black py-1 px-3"}>Không</th>
            </tr>
            <tr>
              <th rowSpan={5} className={"border border-black py-1 px-3"}>
                NỘI DUNG
              </th>
              <td className={"border border-black py-1 px-3"}>
                (1) Xác định đúng vấn đề
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (2) Lựa chọn thông tin chính xác, đầy đủ và khách quan
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (3) Sử dụng dẫn chứng xác thực phù hợp với vấn đề
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (4) Sắp xếp nội dung lựa chọn theo trình tự logic và khoa học
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (5) Đưa ra quan điểm cá nhân độc đáo, sâu sắc về vấn đề
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <th rowSpan={5} className={"border border-black py-1 px-3"}>
                HÌNH THỨC
              </th>
              <td className={"border border-black py-1 px-3"}>
                (6) Đảm bảo yêu cầu về bố cục văn bản
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (7) Viết đúng chính tả và ngữ pháp. Trình bày rõ ràng, sạch đẹp.
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (8) Sử dụng chính xác và thành thạo các quy ước và cước chú
                chính xác.
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (9) Sử dụng kết hợp các phương tiện giao tiếp phi ngôn ngữ khác
                nhau: biểu đồ, hình ảnh, sơ đồ,...
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (10) Tạo lập một văn bản đa phương thức khác để tái hiện lại
                thông tin
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
          </table>
          <p
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Bảng kiểm hỗ trợ kiểm tra đánh giá kĩ năng Viết
          </p>
        </div>
        <div className={"col-span-1 flex flex-col px-10 justify-center"}>
          <table
            className={
              "w-full h-full border-collapse border border-black py-1 px-3"
            }
          >
            <colgroup>
              <col style={{ width: "15%" }} />
              <col style={{ width: "55%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "15%" }} />
            </colgroup>
            <tr>
              <th className={"border border-black py-1 px-3"}>Tiêu chí</th>
              <th className={"border border-black py-1 px-3"}>Biểu hiện</th>
              <th className={"border border-black py-1 px-6"}>Có</th>
              <th className={"border border-black py-1 px-3"}>Không</th>
            </tr>
            <tr>
              <th rowSpan={5} className={"border border-black py-1 px-3"}>
                NỘI DUNG
              </th>
              <td className={"border border-black py-1 px-3"}>
                (1) Xác định được vấn đề nghiên cứu và lí do chọn đề tài
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (2) Đưa ra được lý lẽ thuyết phục
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (3) Đưa ra được dẫn chứng phù hợp
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (4) Có sự so sánh giữa các vấn đề (giữa các vấn đề được tìm
                hiểu, hoặc giữa vấn đề trong và ngoài phạm vi báo cáo…)
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (5) Trình bày được vấn đề theo trình tự ba phần: mở đầu, nội
                dung và kết thúc
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <th rowSpan={5} className={"border border-black py-1 px-3"}>
                HÌNH THỨC
              </th>
              <td className={"border border-black py-1 px-3"}>
                (6) Bám sát dàn ý nhưng không đọc lại văn bản đã chuẩn bị.
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (7) Giọng nói đủ to, rõ ràng để mọi người đều có thể nghe được.
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (8) Sử dụng ngôn ngữ nói kết hợp với cử chỉ điệu bộ, biểu cảm
                gương mặt.
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (9) Có sử dụng kết hợp các phương tiện hỗ trợ
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                (10) Trình bày đầy đủ các vấn đề trong thời gian cho phép.
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
          </table>
          <p
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Bảng kiểm hỗ trợ kiểm tra đánh giá kĩ năng Nói và nghe
          </p>
        </div>
      </div>
      <div className={"grid grid-cols-2 text-xs largelaptop:text-base mt-10"}>
        <div className={"col-span-1 flex flex-col px-10 justify-center"}>
          <table
            className={
              "w-full h-full border-collapse border border-black py-1 px-3"
            }
          >
            <colgroup>
              <col style={{ width: "12%" }} />
              <col style={{ width: "40%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "12%" }} />
            </colgroup>
            <tr>
              <th rowSpan={2} className={"border border-black py-1 px-3"}></th>
              <th rowSpan={2} className={"border border-black py-1 px-3"}>
                Tiêu chí
              </th>
              <th colSpan={3} className={"border border-black py-1 px-3"}>
                Mức độ
              </th>
              <th rowSpan={2} className={"border border-black py-1 px-6"}>
                Ghi chú
              </th>
            </tr>
            <tr>
              <th className={"border border-black py-1 px-3"}>
                Chưa hoàn thành
              </th>
              <th className={"border border-black py-1 px-3"}>Hoàn thành</th>
              <th className={"border border-black py-1 px-3"}>
                Hoàn thành tốt
              </th>
            </tr>
            <tr>
              <td rowSpan={6} className={"border border-black py-1 px-3"}>
                Hình thức
              </td>
              <td className={"border border-black py-1 px-3"}>
                1. Đảm bảo đúng cấu trúc khoa học, logic
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                2. Sử dụng yếu tố đa phương thức, công nghệ thông tin để minh
                họa
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                3. Trình bày rõ ràng, mạch lạc
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                4. Tác phong/Phong cách ngôn ngữ chuẩn chỉnh, phù hợp với nghề
                nghiệp
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                5. Đảm bảo yêu cầu dung lượng/ thời gian quy định
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                6. Thể hiện được tính sáng tạo
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <th rowSpan={4} className={"border border-black py-1 px-3"}>
                NỘI DUNG
              </th>
              <td className={"border border-black py-1 px-3"}>
                7. Đảm bảo tính chính xác, khách quan, chính thống của thông tin
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                8.Đảm bảo thể hiện đúng nội dung thông tin văn bản
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                9. Biết mở rộng, liên hệ các thông tin bên ngoài có liên quan
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                10. Thể hiện nội dung phù hợp với yêu cầu nghề nghiệp
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
          </table>
          <p
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Bảng kiểm hỗ trợ kiểm tra đánh giá sản phẩm Hướng nghiệp
          </p>
        </div>
        <div className={"col-span-1 flex flex-col px-10 justify-center"}>
          <table
            className={
              "w-full h-full border-collapse border border-black py-1 px-3"
            }
          >
            <colgroup>
              <col style={{ width: "50%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "30%" }} />
            </colgroup>
            <tr>
              <th
                colSpan={4}
                className={"border border-black py-1 px-3 text-left"}
              >
                Họ và tên:
              </th>
            </tr>
            <tr>
              <th
                colSpan={4}
                className={"border border-black py-1 px-3 text-left"}
              >
                Nhiệm vụ:
              </th>
            </tr>
            <tr>
              <th rowSpan={2} className={"border border-black py-1 px-3"}>
                Tiêu chí
              </th>
              <th colSpan={2} className={"border border-black py-1 px-3"}>
                Kết quả
              </th>
              <th rowSpan={2} className={"border border-black py-1 px-3"}>
                Ghi chú
              </th>
            </tr>
            <tr>
              <th className={"border border-black py-1 px-3"}>Chưa đạt</th>
              <th className={"border border-black py-1 px-3"}>Đạt</th>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                1. Tham gia đầy đủ các buổi họp nhóm
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                2. Tham gia đóng góp ý kiến
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                3. Hoàn thành sản phẩm đúng hạn
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                4. Hoàn thành sản phẩm chất lượng
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
            <tr>
              <td className={"border border-black py-1 px-3"}>
                5. Thái độ hợp tác
              </td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
              <td className={"border border-black py-1 px-3"}></td>
            </tr>
          </table>
          <p
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Bảng kiểm hỗ trợ kiểm tra đánh giá chéo giữa các thành viên trong
            nhóm
          </p>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;

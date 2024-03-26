"use client";

import { FaRegHandPointRight } from "react-icons/fa";

const ArtExample = ({ color }) => {
  return (
    <>
      <div className={"flex flex-row items-end my-10"}>
        <img className={"mr-16"} src={"/images/nghethuat/kientruc.png"} />
        <div>
          <p className={"text-2xl font-bold mb-5"}>KIẾN TRÚC</p>
          <p className={"mb-5"}>
            Kiến trúc là loại hình nghệ thuật của cách sắp xếp, tổ chức không
            gian. Kiến trúc tồn tại xung quanh cuộc sống chúng ta, từ căn nhà,
            lớp học, đường sá,...đều là thành quả của hoạt động kiến trúc. Em
            hãy lựa chọn 01 trong các nhiệm vụ sau nếu muốn thử sức với lĩnh vực
            này nhé!
          </p>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Văn bản thông tin vừa rồi đã giúp chúng ta thu thập được nhiều
              kiến thức bổ ích, một ngày, tác giả bài viết muốn tổ chức 01 buổi
              triển lãm hoặc đưa các thông tin trên vào bảo tàng để người quan
              tâm có thể quan sát dễ nhất. Là một kiến trúc sư hiểu sâu về ý
              tưởng đó, em hãy giúp tác giả thiết kế 01 bản vẽ không gian triển
              lãm hoặc bảo tàng đảm bảo sao cho người xem sẽ tiếp cận được thông
              tin hấp dẫn nhất nhé!
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Tưởng tượng các công trình kiến trúc trong văn bản được cải tạo để
              trở thành nơi tham quan. Là một kiến trúc sư được mời hỗ trợ thiết
              kế, em sẽ bổ sung các công trình phụ nào (đường đi, chỗ nghỉ chân,
              nhà vệ sinh,...) để vừa đảm bảo tính thuận tiện vừa không làm ảnh
              hưởng đến trật tự của công trình ban đầu? Hãy thể hiện ý tưởng của
              em qua bản vẽ hoặc mô hình 2D/3D nhé!
            </p>
          </div>
        </div>
      </div>
      <div className={"flex flex-row items-end my-10"}>
        <div>
          <p className={"text-2xl font-bold mb-5"}>ĐIÊU KHẮC</p>
          <p className={"mb-5"}>
            Điêu khắc là loại hình nghệ thuật của việc tạo hình, kết hợp các
            loại vật liệu khác nhau để làm ra các khối không gian ba chiều. Các
            sản phẩm của lĩnh vực này chính là những hình khối chúng ta thấy
            hàng ngày: dáng của các bình hoa, bức tượng, phù điêu, ...
          </p>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Một người bạn quốc tế được em giới thiệu về cảnh vật có trong văn
              bản, tuy nhiên, vì chưa được đến nơi đây bao giờ nên bạn rất khó
              hình dung. Em hãy thử tạo hình 01 không gian có trong văn bản mà
              em muốn giới thiệu với người bạn ấy nhất (cổng chùa, đền, bảo
              tàng, ...) bằng chất liệu tự chọn (đất sét, gỗ, giấy, lego, ...)
              nhé!
            </p>
          </div>
        </div>
        <img
          className={"ml-16 w-[500px]"}
          src={"/images/nghethuat/dieukhac.svg"}
        />
      </div>
      <div className={"flex flex-row items-end my-10"}>
        <img className={"mr-16"} src={"/images/nghethuat/vanchuong.svg"} />
        <div>
          <p className={"text-2xl font-bold mb-5"}>VĂN CHƯƠNG</p>
          <p className={"mb-5"}>
            Văn chương là nghệ thuật của ngôn từ. Từ ngày bé chúng ta đã được
            tiếp xúc với văn chương qua những câu chuyện cổ tích, lời hát ru, ca
            dao,... mà ông bà, cha mẹ kể/hát cho chúng ta nghe. Lớn lên, chúng
            ta lại thấy văn học trong các tác phẩm kinh điển, sách báo,... Nếu
            muốn trở thành “cha đẻ” của những sáng tác đó, em hãy thử sức với
            một số nhiệm vụ sau:
          </p>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Tưởng tượng mình là 01 travel blogger vừa kết thúc chuyến đi thú
              vị đến địa điểm trong văn bản. Em hãy viết 01 bài giới thiệu, cảm
              nhận về chuyến đi đó để đăng trên blog của mình nhé!
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Là một nhà văn của năm 2040, em hãy vào vai 01 sự vật mà em ấn
              tượng trong văn bản để hư cấu, kể lại câu chuyện về mình, đảm bảo
              làm sao truyền đi thông điệp mà văn bản gốc muốn gửi gắm nhé!
            </p>
          </div>
        </div>
      </div>
      <div className={"flex flex-row items-end my-10"}>
        <div>
          <p className={"text-2xl font-bold mb-5"}>HỘI HỌA</p>
          <p className={"mb-5"}>
            Hội họa là ngành nghệ thuật của sự phối hợp đường nét, màu sắc trên
            mặt phẳng. Để có cái nhìn rõ hơn về hội họa trong các loại hình nghệ
            thuật là gì, em có thể tìm hiểu về những cái tên huyền thoại như
            Leonardo da Vinci, Vincent Van Gogh, Pablo Picasso, ...
          </p>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Văn bản vừa rồi rất nhiều thông tin bổ ích nhưng lại chưa tiếp cận
              được nhiều bạn đọc. Tác giả đã liên hệ với em - một họa sĩ chuyên
              nghiệp của tương lai - để nhờ vẽ minh họa ảnh bìa cho bài viết, em
              hãy hỗ trợ tác giả nhé!
            </p>
          </div>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Văn bản vừa rồi đưa ra một tư tưởng, thông điệp nhân văn nhưng
              bằng ngôn từ. Là một họa sĩ tin vào sự “thần kì” của những nét vẽ
              và mảng màu, em hãy thử minh họa thông điệp đó bằng 01 bức tranh
              xem sao nhé!
            </p>
          </div>
        </div>
        <img
          className={"ml-16 w-[500px]"}
          src={"/images/nghethuat/hoihoa.svg"}
        />
      </div>
      <div className={"flex flex-row items-end my-10"}>
        <img className={"mr-16"} src={"/images/nghethuat/amnhac.svg"} />
        <div>
          <p className={"text-2xl font-bold mb-5"}>ÂM NHẠC</p>
          <p className={"mb-5"}>
            Âm nhạc là loại hình nghệ thuật của âm thanh, tiếng nhạc từ giọng
            hát hoặc nhạc cụ. Trong thế giới của chúng ta hiện nay, âm nhạc là
            một phần không thể thiếu, nó giúp chúng ta thư giãn, tạo cảm
            xúc,...qua nhiều thể loại khác nhau: ballad, rap, R&B, dân ca,...
          </p>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Văn bản thông tin vừa rồi tuy nhiều kiến thức song không thể giàu
              tính biểu cảm như các thể loại khác, vì thế mà một số bạn trong
              lớp chưa tập trung đọc và học. Là một người có năng khiếu cảm âm,
              thẩm âm, em hãy lựa chọn 01 bản nhạc hoặc bài hát phù hợp với nội
              dung của văn bản để thể hiện, giúp các bạn có động lực, hứng thú
              khám phá văn bản nhé! (Em có thể hát, hát kết hợp chơi nhạc cụ
              hoặc chơi nhạc cụ riêng)
            </p>
          </div>
        </div>
      </div>
      <div className={"flex flex-row items-end my-10"}>
        <div>
          <p className={"text-2xl font-bold mb-5"}>SÂN KHẤU</p>
          <p className={"mb-5"}>
            Sân khấu là loại hình nghệ thuật được thể hiện qua hành động, diễn
            xuất của nhân vật trong các màn trình diễn trực tiếp trên sân khấu.
            Chúng ta có thể hình dung về nó cụ thể hơn khi em nghĩ tới các vở
            kịch, tiểu phẩm, múa, sân khấu hóa, ...
          </p>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              (Với các văn bản thông tin về các loại hình nghệ thuật sân khấu)
              Văn bản thông tin vừa rồi đã cho chúng ta nhiều thông tin bổ ích
              về loại hình nghệ thuật sân khấu, tuy nhiên, nếu chỉ đọc qua văn
              bản thì thật khó hình dung. Em hãy chọn loại hình sân khấu có
              trong văn bản hoặc các loại hình sân khấu khác (tự chọn) để thể
              hiện lại vở diễn trong văn bản. Để từ đó cả lớp cùng thưởng thức
              hoặc có cơ sở so sánh, làm rõ đặc trưng thể loại sân khấu mà văn
              bản giới thiệu nhé!
            </p>
          </div>
        </div>
        <img className={"ml-16"} src={"/images/nghethuat/sankhau.svg"} />
      </div>
      <div className={"flex flex-row items-end my-10"}>
        <img
          className={"mr-16 max-w-[500px]"}
          src={"/images/nghethuat/dienanh.svg"}
        />
        <div>
          <p className={"text-2xl font-bold mb-5"}>ĐIỆN ẢNH</p>
          <p className={"mb-5"}>
            Điện ảnh là môn nghệ thuật “sinh sau đẻ muộn” so với các loại hình
            trên. Vì thế mà nó có sự phối hợp, tổng hòa một số đặc điểm của 06
            lĩnh vực nghệ thuật đã kể tên. Đặc trưng của điện ảnh là kĩ thuật
            ghi lại âm thanh, hình ảnh, ánh sáng. Các khung hình chuyển động sẽ
            được sắp xếp và bố trí hợp lí để tạo nên bộ phim hoàn chỉnh.
          </p>
          <br />
          <div className={"flex flex-row"}>
            <FaRegHandPointRight
              className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
              style={{ color: `${color}` }}
            />
            <p className={"w-[94%]"}>
              Văn bản vừa rồi rất nhiều thông tin bổ ích và tác giả muốn thu hút
              sự chú ý của các bạn học sinh về nó. Tác giả đã liên hệ với em -
              một đạo diễn/editor chuyên nghiệp của tương lai - để nhờ làm 01
              teaser dưới 5 phút giới thiệu cho bài viết, em hãy hỗ trợ tác giả
              nhé!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtExample;

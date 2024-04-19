"use client";

// import { div, Divider, div } from "antd";
import { filterPostsByStatus } from "@/app/classroom/[classId]/pending-posts/page";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { assignmentStatus, colors } from "@/utils/constant";
import paths from "@/app/paths";
import { IoMdArrowDropright } from "react-icons/io";
import TechniqueExample from "@/components/orientationExample/techniqueExample";
import ArtExample from "@/components/orientationExample/artExample";
import MajorExample from "@/components/orientationExample/majorExample";
import SocialExample from "@/components/orientationExample/socialExample";
import ResearchExample from "@/components/orientationExample/researchExample";
import ManagementExample from "@/components/orientationExample/managementExample";

// const thumbnailHeight = "70%";
// const titleHeight = "12%";
// const authorHeight = "12%";
// const totalContentHeight = thumbnailHeight + titleHeight + authorHeight;
// const gapHeight = 1 - totalContentHeight;
export const theme = {
  // GREEN
  SOCIAL: {
    vietnameseName: "XÃ HỘI",
    textColor: colors.green_3,
    mainColor: colors.green_1,
    lightColor: colors.green_6,
    splitterColor: colors.black_1,
    cardBgColorMain: colors.green_7,
    cardBgColorSub: colors.green_1,
    items: [
      {
        title: "GIÁO VIÊN",
        image: "/images/xahoi/giaovien.png",
        content: "Giáo viên là những người có chuyên môn trong lĩnh vực giáo dục và đào tạo, có nhiệm vụ truyền đạt kiến thức, kĩ năng và giá trị cho học sinh, sinh viên hoặc người học trong một môi trường giáo dục cụ thể. Họ có vai trò quan trọng trong việc hướng dẫn, truyền cảm hứng và phát triển tiềm năng của học sinh."
      },
      {
        title: "NHÀ CHUYÊN MÔN VỀ NHÂN SỰ",
        image: "/images/xahoi/nhachuyenmonvenhansu.png",
        content: "Chuyên môn về nhân sự là một người hoặc một nhóm người chuyên về lĩnh vực quản lý nhân sự trong một tổ chức. Chức năng chính của họ là tìm kiếm, thuê, phát triển và quản lý các nhân viên trong tổ chức để đảm bảo hoạt động hiệu quả và thành công của tổ chức."
      },
      {
        title: "QUẢNG CÁO VÀ MARKETING",
        image: "/images/xahoi/quangcaovamarketing.png",
        content: "Những người làm nghề quảng cáo và marketing sẽ thông qua việc sử dụng các công cụ và kênh truyền thông để đưa thông điệp quảng cáo đến khách hàng tiềm năng. Mục đích của quảng cáo là tạo ra sự nhận biết, tạo dựng hình ảnh và gây ấn tượng về sản phẩm, dịch vụ hoặc thương hiệu của một công ty đối với khách hàng."
      },
      {
        title: "QUAN HỆ CÔNG CHÚNG",
        image: "/images/xahoi/quanhecongchung.png",
        content: "Quan hệ công chúng là một lĩnh vực trong marketing và truyền thông tập trung vào việc xây dựng và duy trì mối quan hệ tích cực giữa một tổ chức hoặc cá nhân và công chúng, bao gồm khách hàng, đối tác, cộng đồng, nhà đầu tư và cơ quan truyền thông. Mục tiêu của lĩnh vực này là tạo dựng, đảm bảo và nâng cao hình ảnh và uy tín của tổ chức hoặc cá nhân trong mắt công chúng."
      },
      {
        title: "LUẬT SƯ",
        image: "/images/xahoi/luatsu.png",
        content: "Luật sư một chuyên gia pháp lý được đào tạo và có nhiệm vụ cung cấp dịch vụ pháp lý cho cá nhân, tổ chức hoặc các bên liên quan. Họ là những chuyên gia trong lĩnh vực luật pháp và có kiến thức sâu rộng về hệ thống pháp luật và quy trình pháp lý."
      },
      {
        title: "CÔNG VIỆC VĂN THƯ",
        image: "/images/xahoi/congviecvanthu.png",
        content: "Người làm công việc văn thư là người người hoặc nhóm người có trách nhiệm quản lý và xử lý các công việc liên quan đến thư từ, tài liệu và thông tin trong một tổ chức, cơ quan hoặc văn phòng. Đó có thể là thủ thư, chuyên viên lưu trữ văn thư,..."
      },
      {
        title: "NHÀ TÂM LÝ HỌC",
        image: "/images/xahoi/nhatamlyhoc.png",
        content: "Đây thuật ngữ dùng để chỉ những người chuyên nghiên cứu, áp dụng và áp dụng kiến thức về tâm lý học. Họ có kiến thức sâu về các quá trình tâm lý, hành vi và các yếu tố tâm lý ảnh hưởng đến con người trong các khía cạnh khác nhau của cuộc sống."
      },
      {
        title: "NHÀ BÁO",
        image: "/images/xahoi/nhabao.png",
        content: "Nhà báo là những người làm công việc chuyên về việc thu thập, xử lý và truyền đạt thông tin cho công chúng. Họ có nhiệm vụ tìm hiểu, kiểm chứng và báo cáo về các sự kiện, vấn đề và xu hướng đang diễn ra trong xã hội. Công việc của họ có thể bao gồm viết bài báo, phỏng vấn, làm phóng sự, thu thập thông tin, soạn thảo và biên tập nội dung."
      },
      {
        title: "PHÁT THANH VIÊN",
        image: "/images/xahoi/phatthanhvien.png",
        content: "Phát thanh viên là những người làm việc trong lĩnh vực truyền thanh, có trách nhiệm phát sóng và truyền đạt thông tin, tin tức, giải trí hoặc chương trình nghệ thuật đến công chúng thông qua các phương tiện truyền thanh như đài phát thanh hoặc truyền hình."
      },
      {
        title: "BIÊN - PHIÊN DỊCH",
        image: "/images/xahoi/bienphiendich.png",
        content: "Biên (phiên) dịch là quá trình chuyển đổi ngôn ngữ nói hoặc ngôn ngữ phiên dịch của một nguồn sang một ngôn ngữ khác mà người nghe hiểu được, thường xảy ra trong các tình huống giao tiếp trực tiếp, như hội nghị, cuộc thảo luận quốc tế, tòa án, buổi diễn thuyết, hoặc cuộc họp kinh doanh."
      },
      {
        title: "HƯỚNG DẪN VIÊN DU LỊCH",
        image: "/images/xahoi/huongdanviendulich.png",
        content: "Hướng dẫn viên du lịch là người giới thiệu và giải thích cho du khách các di sản văn hóa cũng như thiên nhiên của một vùng cụ thể được các cơ quan liên quan công nhận. Họ là người thực hiện các điều khoản được ký kết trong hợp đồng cung ứng dịch vụ lữ hành, giúp doanh nghiệp lữ hành thu được lợi nhuận kinh tế và giúp du khách hiểu biết thêm về điểm đến thông qua chuyến đi và bài thuyết minh."
      },
      {
        title: "DẪN CHƯƠNG TRÌNH",
        image: "/images/xahoi/danchuongtrinh.png",
        content: "Dẫn chương trình là hoạt động của một người đảm nhận vai trò chủ đề, người dẫn dắt và điều hành một chương trình truyền hình, sự kiện, buổi biểu diễn hoặc các hoạt động công cộng khác. Họ có nhiệm vụ giữ vai trò trung gian giữa khán giả và nội dung chương trình, tạo ra sự liên kết, tương tác và giữ cho chương trình diễn ra một cách suôn sẻ và hấp dẫn."
      },
    ],
    greeting: (
      <p>
        Chào mừng các em đến với cộng đồng nhóm ngành XÃ HỘI. <br />
        Khối Xã hội bao gồm nhiều ngành nghề khác nhau, nhưng chủ yếu đều liên
        quan đến con người và xã hội, được chia thành các nhóm chính như: Nhóm
        ngành Luật, Quản lý nhà nước; Nhóm ngành Truyền thông, Báo chí; Nhóm
        ngành Giáo dục; Nhóm ngành Phiên dịch; Nhóm ngành Văn hóa và Du lịch;
        ... Khối nhóm ngành này sẽ phù hợp với những bạn thích làm việc cung cấp
        hoặc làm sáng tỏ thông tin, thích giúp đỡ, huấn luyện, chữa trị hoặc
        chăm sóc sức khỏe cho người khác; có khả năng về ngôn ngữ.
      </p>
    ),
    description: (
      <p>
        Xã hội là một khối rất rộng, bao gồm các môn học thuộc lĩnh vực Nhân
        văn, Nghệ thuật và Khoa học xã hội. Khi đã xác định mình phù hợp với
        nhóm này, em có thể tham khảo những nhóm ngành Xã hội phổ biến với một
        số nhiệm vụ cụ thể sau. Từ đó hãy lựa chọn 01 nhiệm vụ em thấy hấp dẫn,
        muốn thử sức nhất nhé!
      </p>
    ),
    example: <SocialExample color={colors.green_3} />,
  },
  // BLUE
  RESEARCH: {
    vietnameseName: "NGHIÊN CỨU",
    textColor: colors.blue_10,
    mainColor: colors.blue_8,
    lightColor: colors.blue_6,
    splitterColor: "#414648",
    cardBgColorMain: colors.blue_6,
    cardBgColorSub: colors.blue_1,
    items: [
      {
        title: "NHÀ THIÊN VĂN HỌC",
        image: "/images/nghiencuu/nhathienvanhoc.png",
        content: "Thiên văn học là một ngành khoa học nghiên cứu về vũ trụ, các hành tinh, ngôi sao, thiên thể và các hiện tượng vũ trụ khác. Nhà thiên văn học nghiên cứu và quan sát các đối tượng và hiện tượng trong vũ trụ bằng cách sử dụng các công cụ quan sát như kính viễn vọng, máy ảnh vũ trụ và vệ tinh. Họ cũng phân tích dữ liệu thu được từ các quan sát và sử dụng các mô hình và lý thuyết thiên văn học để giải thích và dự đoán các hiện tượng vũ trụ."
      },
      {
        title: "NHÀ SINH VẬT/ĐỘNG VẬT/THỰC VẬT HỌC",
        image: "/images/nghiencuu/nhasinhvathoc.png",
        content: "Công việc của họ bao gồm nghiên cứu, quan sát, thực hiện thí nghiệm và phân tích dữ liệu để hiểu và giải thích sự đa dạng và quy luật tự nhiên của các hệ thống sinh vật."
      },
      {
        title: "NHÀ TOÁN HỌC",
        image: "/images/nghiencuu/nhatoanhoc.png",
        content: "Nhà toán học là những người nghiên cứu và áp dụng kiến thức toán học để phân tích, giải quyết và hiểu sâu về các vấn đề liên quan đến số, hình học, cấu trúc, mô hình, và các khái niệm toán học khác. Họ tập trung vào việc phát triển các lý thuyết, phương pháp và công cụ để giải quyết các vấn đề toán học và ứng dụng của chúng trong các lĩnh vực khác nhau."
      },
      {
        title: "NHÀ SỬ HỌC",
        image: "/images/nghiencuu/nhasuhoc.png",
        content: "Nhà sử học là những người nghiên cứu và khám phá về quá khứ của con người, xã hội và sự phát triển của các sự kiện, nhân vật, văn hóa, kinh tế, chính trị và các khía cạnh khác của lịch sử. Họ sử dụng các nguồn tư liệu như tài liệu lịch sử, di chỉ khảo cổ, tài liệu chứng cứ và các tài liệu khác để xây dựng và phân tích các sự kiện và quá trình lịch sử."
      },
      {
        title: "NHÀ HÓA HỌC",
        image: "/images/nghiencuu/nhahoahoc.png",
        content: "Nhà hóa học là những người nghiên cứu và chuyên sâu trong lĩnh vực hoá học. Họ tập trung vào việc khám phá, nghiên cứu, phân tích và hiểu về các cấu trúc, tính chất, thành phần và biểu hiện của chất hoá học trong cuộc sống. Từ đó áp dụng các nguyên lý và phương pháp khoa học để thiết kế và tổng hợp các chất mới, phân tích các quá trình hóa học, và ứng dụng tri thức hoá học vào các lĩnh vực khác nhau."
      },
      {
        title: "NHÀ NGHIÊN CỨU VĂN HỌC",
        image: "/images/nghiencuu/nhanghiencuuvanhoc.png",
        content: "Nghiên cứu văn học là một chuyên ngành khoa học xã hội và nhân văn mà đối tượng nghiên cứu là nghệ thuật ngôn từ. Ở thời điểm hiện tại, nghiên cứu văn học là tên gọi chung cho nhiều bộ môn nghiên cứu tương đối độc lập, tiếp cận cùng một đối tượng nghiên cứu ở những góc độ giống nhau."
      },
      {
        title: "BÁC SĨ",
        image: "/images/nghiencuu/bacsi.png",
        content: "Bác sĩ là những người đã hoàn thành đào tạo y tế chuyên sâu và có năng lực và quyền hạn hướng dẫn, chẩn đoán, điều trị và chăm sóc sức khỏe của con người."
      },
      {
        title: "HUẤN LUYỆN VIÊN",
        image: "/images/nghiencuu/huanluyenvien.png",
        content: "Huấn luyện viên là người chuyên đào tạo, hướng dẫn và phát triển kĩ năng, năng lực và hiệu suất của cá nhân hoặc nhóm trong một lĩnh vực cụ thể."
      },
    ],
    greeting: (
      <p>
        Chào mừng các em đến với cộng đồng nhóm ngành NGHIÊN CỨU. <br />
        Đây là nơi dành cho những bạn thích quan sát, tìm tòi, khám phá, học
        hỏi, điều tra, phân tích, đánh giá hoặc giải quyết vấn đề, có khả năng
        tìm hiểu sâu một lĩnh vực yêu thích. Chính vì vậy, tại cộng đồng này, em
        có thể hóa thân thành những Chuyên gia phân tích dữ liệu, Nghiên cứu
        sinh, ... thuộc bất kì lĩnh vực, chuyên ngành nào em yêu thích.
      </p>
    ),
    description: (
      <p>
        Người có sở thích nổi trội ở nhóm Nghiên cứu thường thích phân tích,
        nghiên cứu sâu mọi vấn đề để tìm ra nguồn gốc, nguyên nhân của chúng. Họ
        cũng hay tò mò, thích quan sát, học hỏi, điều tra, đánh giá và giải
        quyết các vấn đề. Chính bởi tính chất đặc thù của nhóm này nên các công
        việc phổ biến được xếp trong đây chủ yếu là các giáo sư, nhà nghiên cứu,
        nghiên cứu sinh, … Vì vậy, để tiếp cận nhóm ngành này, em hãy tưởng
        tượng mình cũng là một nhà nghiên cứu và tập trung “nghiên cứu” sâu một
        lĩnh vực em yêu thích nhé!
      </p>
    ),
    example: <ResearchExample color={colors.blue_10} />,
  },
  // YELLOW
  TECHNIQUE: {
    vietnameseName: "KĨ THUẬT",
    textColor: colors.yellow_2,
    mainColor: "#ffd78f",
    lightColor: colors.yellow_1,
    splitterColor: colors.yellow_2,
    cardBgColorMain: colors.yellow_3,
    cardBgColorSub: colors.yellow_4,
    items: [
      {
        title: "KĨ SƯ CÔNG NGHIỆP CHẾ BIẾN, CHẾ TẠO",
        image: "/images/kithuat/kysucongnghiepchebien.png",
        content: "Kĩ sư ngành công nghiệp chế biến, chế tạo là người có kiến thức và kĩ năng chuyên môn trong việc thiết kế, phát triển, và quản lý quy trình sản xuất và chế tạo các sản phẩm công nghiệp. Họ có vai trò quan trọng trong việc áp dụng các nguyên lý kĩ thuật và khoa học vào sản xuất hàng hóa và dịch vụ."
      },
      {
        title: "KĨ SƯ KĨ THUẬT",
        image: "/images/kithuat/kysukithuat.png",
        content: "Kĩ sư mảng kĩ thuật là người có kiến thức chuyên môn và kĩ năng kĩ thuật trong một lĩnh vực cụ thể. Họ sử dụng kiến thức khoa học và kĩ thuật để thiết kế, phát triển, xây dựng, vận hành và bảo trì các hệ thống, sản phẩm, công trình hoặc quy trình kĩ thuật."
      },
      {
        title: "KĨ SƯ ĐIỆN TỬ",
        image: "/images/kithuat/kisudientu.png",
        content: "Kĩ sư điện tử là những người có kiến thức và kĩ năng chuyên môn trong lĩnh vực điện tử, tức là việc nghiên cứu, thiết kế, phát triển, sản xuất và quản lý các thiết bị, hệ thống và linh kiện điện tử."
      },
      {
        title: "KĨ SƯ VIỄN THÔNG",
        image: "/images/kithuat/kisuvienthong.png",
        content: "Kĩ sư viễn thông là những người có kiến thức và kĩ năng chuyên sâu về viễn thông, cụ thể là trong lĩnh vực truyền thông và mạng máy tính. Họ thường làm việc trong ngành viễn thông, các nhà mạng, công ty di động, công ty dịch vụ truyền thông, nhà sản xuất thiết bị viễn thông và các tổ chức khác liên quan đến truyền thông."
      },
      {
        title: "NHÀ PHÁT TRIỂN PHẦN MỀM",
        image: "/images/kithuat/nhaphattrienphanmem.png",
        content: "Nhà phát triển phần mềm là những người hoặc tổ chức chuyên về việc thiết kế, xây dựng, triển khai và duy trì các phần mềm. Công việc của họ bao gồm việc phân tích yêu cầu, thiết kế giao diện, viết mã, kiểm thử, triển khai và hỗ trợ sau khi phần mềm được triển khai."
      },
      {
        title: "NHÀ LẬP TRÌNH ỨNG DỤNG",
        image: "/images/kithuat/nhalaptrinhungdung.png",
        content: "Nhà lập trình ứng dụng là những người có kiến thức và kĩ năng trong việc phát triển ứng dụng máy tính hoặc di động. Họ thường làm việc trong lĩnh vực phần mềm, công ty phát triển ứng dụng, công ty công nghệ thông tin và các tổ chức khác liên quan đến phát triển phần mềm."
      },
    ],
    greeting: (
      <p>
        Chào mừng em đến với cộng đồng nhóm ngành KĨ THUẬT <br />
        Từ khi còn nhỏ và kể cả bây giờ, em đã từng thích các hoạt động vận
        động, thủ công, chế tạo hay mày mò cơ chế/bản chất của một sự vật, hiện
        tượng nào đó chưa? Nếu câu trả lời là có thì nhóm ngành kĩ thuật rất phù
        hợp với em đấy! <br />
        Nhóm ngành này sẽ giúp các em có cơ hội tiếp xúc với các công cụ, dụng
        cụ, thiết bị cơ khí hoặc điện; thiết kế, xây dựng, sửa chữa máy móc; ...
        và kể cả hoạt động chăn nuôi, trồng trọt vật nuôi/cây trồng. <br />
        Trong tương lai, các em có thể lựa chọn các nghề nghiệp sau: kĩ sư,
        chuyên viên kiểm định chất lượng, nhân viên vận hành hệ thống, lập trình
        viên, ...
      </p>
    ),
    description: (
      <p>
        Kĩ thuật là lĩnh vực trực tiếp liên quan đến quá trình sản xuất công cụ,
        sản phẩm hỗ trợ cho cuộc sống hàng ngày. Đó là những sản phẩm sơ khai
        như cuốc, xẻng, kim chỉ hay đến các sản phẩm hiện đại, công nghệ cao như
        điện thoại, máy tính, robot,… Những người làm nghề kỹ thuật đảm nhận
        nhiệm vụ vận dụng những thành quả của khoa học và công nghệ vào quá
        trình sản xuất. Đồng thời, họ không ngừng nghiên cứu và nâng cao chất
        lượng các thành quả đó nhằm phục vụ sự phát triển sản xuất của mỗi cơ
        sở, mỗi quốc gia. <br />
        <br />
        Hãy tham khảo những nhóm ngành kĩ thuật phổ biến với một số nhiệm vụ cụ
        thể sau và lựa chọn 01 nhiệm vụ em thấy hấp dẫn, muốn thử sức nhất nhé!
      </p>
    ),
    // example: <TechniqueExample {...{ color: colors.yellow_3 }} />,
  },
  // LIGHT PINK
  ART: {
    vietnameseName: "NGHỆ THUẬT",
    textColor: colors.pink_4,
    mainColor: "#f8bbc1",
    lightColor: "#fbdde0",
    splitterColor: colors.black_1,
    cardBgColorMain: colors.pink_7,
    cardBgColorSub: colors.pink_3,
    items: [
      {
        title: "KIẾN TRÚC SƯ",
        image: "/images/nghethuat/kientrucsu.png",
        content: "Kiến trúc sư là những người chuyên thiết kế và lập kế hoạch xây dựng các công trình kiến trúc. Họ có kiến thức về các nguyên tắc thiết kế, kĩ thuật xây dựng và quy định pháp lý liên quan đến việc xây dựng."
      },
      {
        title: "NHÀ THIẾT KẾ",
        image: "/images/nghethuat/nhathietke.png",
        content: "Nhà thiết kế là người chuyên tạo ra và phát triển các ý tưởng và thiết kế cho các sản phẩm, đồ họa, trang web, nội thất, thời trang và nhiều lĩnh vực khác. Công việc của nhà thiết kế là tạo ra các giải pháp sáng tạo và thẩm mỹ dựa trên nhu cầu và yêu cầu của khách hàng hoặc dựa trên mục tiêu và mục đích của dự án."
      },
      {
        title: "NHÀ THIẾT KẾ ĐỒ HỌA",
        image: "/images/nghethuat/nhathietkedohoa.png",
        content: "Nhà thiết kế đồ họa là người chuyên tạo ra các thiết kế đồ họa sáng tạo và thu hút. Công việc của họ là sử dụng các phần mềm và công cụ đồ họa để tạo ra các hình ảnh, biểu đồ, biểu đồ, logo, bố cục, và các tác phẩm đồ họa khác để truyền đạt thông điệp hoặc gợi cảm xúc."
      },
      {
        title: "NHẠC SĨ",
        image: "/images/nghethuat/nhacsi.png",
        content: "Nhạc sĩ là những người sáng tác và tạo ra các tác phẩm âm nhạc. Họ có khả năng sáng tạo, ý tưởng và kiến thức về âm nhạc để tạo ra các bài hát, bản nhạc, và các tác phẩm âm nhạc khác. Nhạc sĩ có thể làm việc trong nhiều thể loại âm nhạc khác nhau, bao gồm nhạc pop, nhạc rock, nhạc cổ điển, nhạc jazz, nhạc đồng quê, và nhiều thể loại khác."
      },
      {
        title: "CA SĨ",
        image: "/images/nghethuat/casi.png",
        content: "Ca sĩ là những người biểu diễn và trình bày các bài hát hoặc tác phẩm âm nhạc trước công chúng. Họ có năng khiếu về âm nhạc, sử dụng giọng hát của mình để thể hiện cảm xúc, truyền đạt thông điệp và tạo ra một trải nghiệm âm nhạc cho người nghe."
      },
      {
        title: "DIỄN VIÊN",
        image: "/images/nghethuat/dienvien.png",
        content: "Diễn viên là người tham gia vào các hoạt động diễn xuất và trình diễn vai diễn trên sân khấu, trong phim ảnh, truyền hình, hoặc các phương tiện truyền thông khác. Họ đóng vai trò quan trọng trong việc thể hiện các nhân vật và truyền đạt cảm xúc, ý nghĩa và thông điệp của các tác phẩm nghệ thuật đến khán giả."
      },
      {
        title: "ĐẦU BẾP",
        image: "/images/nghethuat/daubep.png",
        content: "Đầu bếp là người có chuyên môn trong lĩnh vực nấu ăn và trực tiếp quản lý hoạt động nhà bếp trong các nhà hàng, khách sạn, nhà hàng tiệc cưới, nhà hàng thức ăn nhanh và các cơ sở ẩm thực khác. Họ có vai trò quan trọng trong việc lên kế hoạch, chuẩn bị và chế biến các món ăn để đáp ứng nhu cầu ẩm thực của khách hàng."
      },
      {
        title: "NHIẾP ẢNH GIA",
        image: "/images/nghethuat/nhiepanhgia.png",
        content: "Nhiếp ảnh gia là người chuyên nghiệp hoặc nghiệp dư chuyên về nghệ thuật và kĩ thuật chụp ảnh. Họ sử dụng máy ảnh và các thiết bị liên quan để tạo ra những bức ảnh chất lượng cao và thể hiện ý tưởng, cảm xúc và câu chuyện thông qua hình ảnh. Để trở thành một nhiếp ảnh gia chuyên nghiệp, người ta thường cần có một sự kết hợp giữa sự sáng tạo và kĩ thuật. Ngoài ra, kiên nhẫn, sự quan tâm đến chi tiết và khả năng làm việc độc lập cũng là những yếu tố quan trọng."
      },
    ],
    greeting: (
      <p>
        Chào mừng các em đến với cộng đồng nhóm ngành NGHỆ THUẬT.
        <br />
        Nếu em là một bạn yêu thích sự tự do, có trí tưởng tượng phong phú, có
        khả năng sáng tạo và đặc biệt là yêu thích cái đẹp thì nhóm ngành nghệ
        thuật là một lựa chọn phù hợp. <br />
        Những người mang thiên hướng nghệ thuật có nhiều khả năng, tài năng khác
        nhau: khiếu thẩm mỹ, ăn mặc đẹp, vẽ, viết, nhảy, hát, chụp hình, quay
        phim, chơi một nhạc cụ, thẩm âm, v.v. <br />
        Lựa chọn nhóm ngành nghệ thuật, em có thể đi theo các nghề nghiệp rất đa
        dạng, tùy thuộc vào sở trường và đam mê của mình: Nhà thiết kế, Họa sĩ,
        Ca sĩ, Nhạc sĩ, Nghệ nhân, Kiến trúc sư, Diễn viên, Designer, ...
      </p>
    ),
    description: (
      <p>
        Nghệ thuật là một lĩnh vực của sự sáng tạo tinh thần. Đây là không gian
        rộng lớn để các em có thể thể hiện những năng khiếu, năng lực thẩm mĩ
        riêng của mình. Hãy tham khảo những nhóm ngành nghệ thuật phổ biến với
        một số nhiệm vụ cụ thể sau và lựa chọn 01 nhiệm vụ em thấy hấp dẫn, muốn
        thử sức nhất nhé!
      </p>
    ),
    example: <ArtExample color={colors.pink_4} />,
  },
  // PINK
  MANAGEMENT: {
    type: "MANAGEMENT",
    icon: "/management.svg",
    vietnameseName: "QUẢN LÝ",
    textColor: colors.pink_5,
    mainColor: "#fda897",
    lightColor: "#fee2dc",
    splitterColor: "#494241",
    cardBgColorMain: colors.pink_6,
    cardBgColorSub: colors.pink_1,
    items: [
      {
        title: "LÃNH ĐẠO, QUẢN LÝ CÁC TỔ CHỨC CHÍNH TRỊ",
        image: "/images/quanly/lanhdaoquanlycactochucchinhtri.png",
        content: "Đây là nhóm nghề nghiệp của những người có chức vụ; có quyền quản lý, chỉ huy, điều hành từ trung ương Đảng tới cơ sở. Họ thể hiện vai trò của nhà nước và kiểm soát việc thực hiện quyền lực của nhà nước ta trên 03 quyền: quyền lập pháp, hành pháp và tư pháp. Em có thể thấy họ qua những chức vụ như: Bí thư, Phó Bí thư Đảng ủy, Chủ tịch, Phó Chủ tịch Hội đồng nhân dân, Ủy ban nhân dân, Vụ trưởng, Phó Vụ trưởng,..."
      },
      {
        title: "LÃNH ĐẠO, QUẢN LÝ CỦA TỔ CHỨC CHÍNH TRỊ - XÃ HỘI",
        image: "/images/quanly/lanhdaoquanlycuatochucchinhtrixahoi.png",
        content: "Tổ chức chính trị - xã hội là các tổ chức được thành lập bởi những thành viên đại diện cho lực lượng xã hội nhất định, thực hiện các hoạt động xã hội rộng rãi và có ý nghĩa chính trị, hiện nước ta có 06 tổ chức chính trị - xã hội bao gồm: Công đoàn, Đoàn TNCS HCM, Hội Nông dân, Hội Cựu Chiến binh, Hội liên hiệp Phụ nữ và Mặt trận Tổ quốc Việt Nam. Theo đó, nếu muốn theo định hướng quản lý này, em sẽ được làm công tác lãnh đạo, điều hành các tổ chức này."
      },
      {
        title: "NHÀ QUẢN LÝ CỦA TỔ CHỨC NGHIỆP CHỦ, NHÂN ĐẠO VÀ VÌ QUYỀN LỢI ĐẶC THÙ KHÁC",
        image: "/images/quanly/nhaquanlycuatochucnghiepchu.png",
        content: "Xã hội nào cũng sẽ tồn tại các nhóm dễ bị tổn thương như: người già, người vô gia cư, người mắc bệnh hiểm nghèo,... Vì thế, các nhà quản lý của tổ chức nghiệp chủ, nhân đạo và vì quyền lợi đặc thù khác sẽ là những người điều hành, đảm bảo việc cung cấp quyền lợi, hỗ trợ cho các đối tượng này. Nếu là một người có khả năng lãnh đạo, quản lý và am hiểu về công tác xã hội, em có thể theo đuổi ngành nghề này nhé!"
      },
      {
        title: "NHÀ QUẢN LÝ CỦA CÁC CƠ QUAN TẬP ĐOÀN, TỔNG CÔNG TY VÀ TƯƠNG ĐƯƠNG",
        image: "/images/quanly/nhaquanly.png",
        content: "Đây là nhóm nhà lãnh đạo, quản lý có phạm vi hoạt động rộng lớn. Họ có thể làm việc trong các công ty tư nhân, doanh nghiệp, giám đốc trường đại học, viện trưởng viện nghiên cứu,... Để trở thành một người như thế, em cần có trách nhiệm định hướng và điều hành các hoạt động của tổ chức và đảm đương các nhiệm vụ quản lý chiến lược, lãnh đạo nhân sự, quản lý tài chính, phân phối nguồn lực và định hình chiến lược phát triển cho tổ chức."
      },
    ],
    greeting: (
      <p>
        Chào mừng các em đến với cộng đồng nhóm ngành QUẢN LÝ. <br /> Nhóm ngành
        này rất phù hợp với những bạn thích làm việc với những người khác, có
        khả năng tác động, thuyết phục, thể hiện, lãnh đạo hoặc quản lí các mục
        tiêu tổ chức, các lợi ích kinh tế. Ngành Quản lý là một lĩnh vực quan
        trọng và đa dạng, đóng vai trò quyết định trong việc xây dựng và duy trì
        sự thành công của các tổ chức. Các chuyên gia trong ngành này có kiến
        thức và kỹ năng đặc thù để lãnh đạo, tổ chức và quản lý các hoạt động
        trong một tổ chức, nhằm đạt được các mục tiêu cụ thể và thích ứng với sự
        thay đổi.. Do đó nó phù hợp với những bạn lựa chọn ngành bao gồm Quản lý
        Kinh doanh, Quản lý Dự án, Quản lý Tài chính, Quản lý Nhân sự, Quản lý
        Sản xuất và Quản lý Chiến lược,..
      </p>
    ),
    description: (
      <p>
        Những người thuộc nhóm Quản lý sẽ tập trung vào việc phát triển và áp
        dụng các nguyên tắc, phương pháp và kỹ năng quản lý để điều hành và điều
        chỉnh hoạt động của tổ chức, doanh nghiệp hoặc dự án. Điều này bao gồm
        nhiều lĩnh vực chuyên ngành khác nhau như quản lý doanh nghiệp, quản lý
        nguồn nhân lực, quản lý tài chính, quản lý dự án, quản lý chuỗi cung ứng
        và quản lý chiến lược, ... nhằm mục đích xây dựng, phát triển và duy trì
        các tổ chức hiệu quả và cạnh tranh. Do đó nếu em có nhiều điểm chung với
        nhóm này thì hãy thử sức trải nghiệm những nhiệm vụ dưới đây nhé!
      </p>
    ),
    // example: <ManagementExample color={colors.pink_5} />,
  },
  // GRAY
  MAJOR: {
    vietnameseName: "NGHIỆP VỤ",
    textColor: colors.grey_2,
    mainColor: "#bfbfbf",
    lightColor: colors.grey_1,
    splitterColor: colors.black_1,
    cardBgColorMain: colors.grey_3,
    cardBgColorSub: colors.grey_1,
    items: [
      {
        title: "KẾ TOÁN",
        image: "/images/nghiepvu/ketoan.png",
        content: "Người làm kế toán là người làm những công việc ghi chép, thu thập và xử lý các thông tin về tình hình hoạt động tài chính của doanh nghiệp, các cơ quan, tổ chức hoặc cơ sở kinh doanh. Nhiệm vụ của họ là thu thập, phân loại, xử lý và tạo ra thông tin tài chính chính xác và đáng tin cậy để hỗ trợ quyết định kinh doanh, quản lý tài sản và liên hệ với các bên liên quan."
      },
      {
        title: "NHÀ TƯ VẤN TÀI CHÍNH VÀ ĐẦU TƯ",
        image: "/images/nghiepvu/nhatuvantaichinhvadautu.png",
        content: "Những nhà tư vấn tài chính và đầu tư là những người người có kiến thức và kỹ năng chuyên sâu về tài chính và đầu tư, và cung cấp các lời khuyên và hướng dẫn cho khách hàng về việc quản lý tài sản, đầu tư và lập kế hoạch tài chính cá nhân hoặc doanh nghiệp."
      },
      {
        title: "NHÀ PHÂN TÍCH TÀI CHÍNH",
        image: "/images/nghiepvu/nhaphantichtaichinh.png",
        content: "Những nhà phân tích tài chính là những người chuyên về việc phân tích thông tin tài chính của một tổ chức hoặc doanh nghiệp để đưa ra đánh giá, dự báo và các quyết định liên quan đến tài chính. Công việc của nhà phân tích tài chính bao gồm phân tích báo cáo tài chính, đánh giá hiệu suất tài chính, dự báo tài chính và cung cấp thông tin hỗ trợ quyết định cho các bên liên quan."
      },
    ],
    greeting: (
      <p>
        Chào mừng các em đến với cộng đồng nhóm ngành NGHIỆP VỤ. <br />
        Nhóm ngành này rất phù hợp với những bạn thích làm việc với dữ liệu, con
        số, có khả năng làm việc văn phòng, thống kê; thực hiện các công việc
        đòi hỏi sự chi tiết, tỉ mỉ, cẩn thận hoặc làm theo hướng dẫn của người
        khác, ... Công việc trong ngành Nghiệp vụ thường đòi hỏi sự tư duy
        logic, khả năng phân tích và giải quyết vấn đề. Do đó nó phù hợp với
        những bạn lựa chọn ngành kế toán, kinh doanh, Nghiệp vụ Kinh doanh,
        Nghiệp vụ Tài chính, Nghiệp vụ Nhân sự, nghiệp vụ tiếp thị, ...
      </p>
    ),
    description: (
      <p>
        Những người hợp với nhóm ngành này là người có tổ chức, logic và sự định
        hướng chi tiết cho công việc. Họ thích cấu trúc quy tắc và quy trình rõ
        ràng, trong công việc có thế mạnh trong việc xử lý dữ liệu và có xu
        hướng giỏi toán học. Hãy tham khảo những nhóm ngành nghiệp vụ với một số
        nhiệm vụ cụ thể sau và lựa chọn 01 nhiệm vụ em thấy hấp dẫn, muốn thử
        sức nhất nhé!
      </p>
    ),
    example: <MajorExample color={colors.grey_2} />,
  },
};

const filterPostsByOrientation = async (
  status: string,
  classId: number,
  orientation: string,
) => {
  const res = await filterPostsByStatus(status, classId);
  return res.filter((post: object) => post.orientation === orientation);
  // console.log(
  //   "check: ",
  //   res.filter((post: object) => post.orientation === orientation),
  // );
  // return res.filter((post: object) => post.orientation === orientation);
};

const OrientationPostsList = (props: any) => {
  // console.log(props.params);
  const orientationName = props.params.orientationName;
  const mappingArray = {
    SOCIAL: ["Xã hội"],
    ART: ["Nghệ thuật"],
    SCIENCE: ["Khoa học"],
  };

  const classId = props.params.classId;
  const [postsList, setPostsList] = useState([]);
  const [showExample, setShowExample] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      const filteredPosts = await filterPostsByOrientation(
        assignmentStatus.APPROVED,
        props.params.classId,
        orientationName,
      );
      const duplicatedPosts = [
        ...filteredPosts,
        // ...filteredPosts,
        // ...filteredPosts,
        // ...filteredPosts,
        // ...filteredPosts,
        // ...filteredPosts,
        // ...filteredPosts,
        // ...filteredPosts,
        // ...filteredPosts,
        // ...filteredPosts,
      ];
      // console.log("raw: ", filteredPosts);
      await setPostsList(duplicatedPosts);
    };

    fetchPosts();
  }, []);
  console.log(postsList);

  //   const nameElement = document.querySelector(".name");
  //   console.log(nameElement);
  //   const parentElement = nameElement?.parentElement;

  //   parentElement?.addEventListener("scroll", () => {
  //     const parentRect = parentElement.getBoundingClientRect();
  //     const nameRect = nameElement.getBoundingClientRect();

  //     // Kiểm tra xem phần tử cha đã cuộn hết hay chưa
  //     if (parentRect.bottom < nameRect.bottom) {
  //       // Nếu phần tử cha đã cuộn hết, cố định phần tử "name" ở cuối phần tử cha
  //       nameElement.style.position = "absolute";
  //       nameElement.style.bottom = "0";
  //     } else {
  //       // Nếu phần tử cha chưa cuộn hết, đặt lại vị trí của phần tử "name"
  //       nameElement.style.position = "static"; // hoặc 'relative' tùy thuộc vào cấu trúc CSS của bạn
  //     }
  //   });

  return (
    <>
      <div
        className={
          "w-full mx-auto mb-8  overflow-hidden px-2"
        }
      // style={{ overflowY: "scroll" }}
      >
        <div className={" flex justify-center p"}>
          <div
            className={
              "py-5 w-full rounded-xl flex justify-center items-center shadow-xl name mx-14 mb-4"
            }
            style={{ backgroundColor: theme[orientationName].mainColor }}
          >
            <div
              className={
                "text-center font-bold laptop125percent:text-2xl text-xl"
              }
              style={{
                // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                color: `${theme[orientationName].textColor}`,
              }}
            >
              {/*{mappingArray[orientationName][0].toUpperCase()}*/}
              {theme[orientationName].vietnameseName}
            </div>
          </div>
        </div>

        <div className={"px-10"}>
          {/* <div className={"italic font-Arial xl:text-sm text-xs"}>
            {theme[orientationName].greeting}
          </div> */}
          {/* <div
            className={" my-3 h-[2px]"}
            style={{ backgroundColor: theme[orientationName].textColor }}
          /> */}
          <div
            className={
              "rounded-xl text-left px-10 py-4 w-[80%] mx-auto font-normal text-sm mb-5 mt-2"
            }
            style={{
              border: `2px solid ${theme[orientationName].textColor}`,
            }}
          >
            {theme[orientationName].greeting}
          </div>
          {/*EXAMPLE*/}
          <div
            className={"flex flex-row items-center cursor-pointer"}
            onClick={() => setShowExample(!showExample)}
          >
            <div
              className={"w-8 h-8 flex items-center justify-center"}
              style={{
                // position: "absolute",
                transition: "transform 0.1s ease",
                transform: showExample ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              <IoMdArrowDropright className={"w-full h-full"} />
            </div>
            <p className={"text-lg font-bold ml-3"}>ĐỊNH HƯỚNG TRẢI NGHIỆM</p>
          </div>
          {showExample && <TechniqueExample {...theme[orientationName]} />}
          <div
            className={"flex flex-row items-center cursor-pointer"}
            onClick={() => setShowPosts(!showPosts)}
            style={{ position: "relative" }}
          >
            <div
              className={"w-8 h-8 flex items-center justify-center"}
              style={{
                // position: "absolute",
                transition: "transform 0.1s ease",
                transform: showPosts ? "rotate(90deg)" : "rotate(0deg)",
              }}
            >
              <IoMdArrowDropright className={"w-full h-full"} />
            </div>
            <p className={"text-lg font-bold ml-3"}>CỘNG ĐỒNG NGHỀ NGHIỆP</p>
          </div>
          {showPosts && (
            <div
              className={"flex flex-wrap"}
              style={{ transition: "opacity 0.3s ease" }}
            >
              {postsList.map((post: object, index: number) => (
                <div
                  key={post.id}
                  className={"w-1/5 relative"}
                  style={{ paddingBottom: "20%", opacity: showPosts ? 1 : 0 }}
                >
                  <div
                    className={
                      "cell rounded-3xl p-3 cursor-pointer hover:shadow-xl"
                    }
                    style={{
                      backgroundColor: theme[orientationName].mainColor,
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "92%",
                      height: "92%",
                      display: "grid",
                      gridTemplateRows: "70% 12% 12%",
                      gap: "calc((100% - (70% + 12% + 12%)) / 2)",
                    }}
                    onClick={() =>
                      router.push(
                        `${paths.classroom}/${classId}/post/${post.id}`,
                      )
                    }
                  >
                    <div
                      className={"h-full w-full rounded-2xl max-w-full"}
                      style={{
                        backgroundColor: theme[orientationName].lightColor,
                      }}
                    ></div>
                    <div
                      className={
                        "h-full w-full rounded-2xl px-3 max-w-full text-ellipsis overflow-hidden flex items-center"
                      }
                      style={{
                        backgroundColor: theme[orientationName].lightColor,
                      }}
                    >
                      <p
                        className={
                          "uppercase font-medium truncate leading-none max-h-fit text-base 2xl:text-lg"
                        }
                        style={{ color: theme[orientationName].textColor }}
                      >
                        {post.title}
                      </p>
                    </div>
                    <div
                      className={
                        "h-full w-full rounded-2xl px-3 truncate max-w-full flex  items-center"
                      }
                      style={{
                        backgroundColor: theme[orientationName].lightColor,
                      }}
                    >
                      <p
                        className={" text-sm 2xl:text-base"}
                        style={{ color: theme[orientationName].textColor }}
                      >
                        {post.user.lastName + " " + post.user.firstName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrientationPostsList;

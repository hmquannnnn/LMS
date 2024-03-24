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
    mainColor: "#bed5fa",
    lightColor: "#dbe7fc",
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
    lightColor: "#fff2da",
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
    example: <TechniqueExample color={colors.yellow_2} />,
  },
  // LIGHT PINK
  ART: {
    vietnameseName: "NGHỆ THUẬT",
    textColor: colors.pink_4,
    mainColor: "#f8bbc1",
    lightColor: "#fbdde0",
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
    vietnameseName: "QUẢN LÝ",
    textColor: colors.pink_5,
    mainColor: "#fda897",
    lightColor: "#fee2dc",
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
    example: <ManagementExample color={colors.pink_5} />,
  },
  // GRAY
  MAJOR: {
    vietnameseName: "NGHIỆP VỤ",
    textColor: colors.grey_2,
    mainColor: "#bfbfbf",
    lightColor: "#f2f2f2",
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
  return (
    <>
      <div
        className={"h-full w-full mx-auto flex mb-8"}
        // style={{ overflowY: "scroll" }}
      >
        <div className={"px-10"}>
          <div
            className={
              "rounded-xl flex justify-center items-center shadow-xl px-3 h-[600px] 2xl:h-[700px]"
            }
            style={{ backgroundColor: theme[orientationName].mainColor }}
          >
            <div
              className={"text-center font-bold text-2xl"}
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

        <div>
          <div className={"italic font-timesNewRoman text-lg"}>
            {theme[orientationName].greeting}
          </div>
          <div
            className={" my-3 h-[2px]"}
            style={{ backgroundColor: theme[orientationName].textColor }}
          />
          <div
            className={
              "rounded-xl text-center px-10 py-10 w-[80%] mx-auto font-semibold text-lg"
            }
            style={{
              border: `2px solid ${theme[orientationName].textColor}`,
            }}
          >
            {theme[orientationName].description}
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
            <p className={"text-xl font-bold ml-3"}>ĐỊNH HƯỚNG TRẢI NGHIỆM</p>
          </div>
          {showExample && theme[orientationName].example}
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
            <p className={"text-xl font-bold ml-3"}>CỘNG ĐỒNG THỂ HIỆN</p>
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

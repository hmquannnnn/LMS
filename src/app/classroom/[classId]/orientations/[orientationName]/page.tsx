"use client";

// import { div, Divider, div } from "antd";
import {filterPostsByStatus} from "@/app/classroom/[classId]/pending-posts/page";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {assignmentStatus, colors} from "@/utils/constant";
import paths from "@/app/paths";

// const thumbnailHeight = "70%";
// const titleHeight = "12%";
// const authorHeight = "12%";
// const totalContentHeight = thumbnailHeight + titleHeight + authorHeight;
// const gapHeight = 1 - totalContentHeight;
const theme = {
  // GREEN
  SOCIAL: {
    textColor: colors.green_3,
    mainColor: colors.green_1,
    lightColor: colors.green_6,
    description: (
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
  },
  // BLUE
  RESEARCH: {
    textColor: colors.blue_10,
    mainColor: "#bed5fa",
    lightColor: "#dbe7fc",
    description: (
      <p>
        Chào mừng các em đến với cộng đồng nhóm ngành NGHIÊN CỨU. <br />
        Đây là nơi dành cho những bạn thích quan sát, tìm tòi, khám phá, học
        hỏi, điều tra, phân tích, đánh giá hoặc giải quyết vấn đề, có khả năng
        tìm hiểu sâu một lĩnh vực yêu thích. Chính vì vậy, tại cộng đồng này, em
        có thể hóa thân thành những Chuyên gia phân tích dữ liệu, Nghiên cứu
        sinh, ... thuộc bất kì lĩnh vực, chuyên ngành nào em yêu thích.
      </p>
    ),
  },
  // YELLOW
  TECHNIQUE: {
    textColor: colors.yellow_2,
    mainColor: "#ffd78f",
    lightColor: "#fff2da",
    description: (
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
  },
  // LIGHT PINK
  ART: {
    textColor: colors.pink_4,
    mainColor: "#f8bbc1",
    lightColor: "#fbdde0",
    description: (
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
  },
  // PINK
  MANAGEMENT: {
    textColor: colors.pink_5,
    mainColor: "#fda897",
    lightColor: "#fee2dc",
    description: (
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
  },
  // GRAY
  MAJOR: {
    textColor: colors.grey_2,
    mainColor: "#bfbfbf",
    lightColor: "#f2f2f2",
    description: (
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
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams);
  console.log("check router: ", router);
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
      <div className={"h-full w-full 2xl:w-4/6 mx-auto flex mb-8"}>
        <div className={"px-10"}>
          <div
            className={
              "min-h-full rounded-xl flex justify-center items-center shadow-xl px-3 h-[600px] 2xl:h-[700px]"
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
              {orientationName}
            </div>
          </div>
        </div>

        <div>
          <div className={"italic font-timesNewRoman text-lg"}>
            {theme[orientationName].description}
          </div>
          <div
            className={" my-3 h-[2px]"}
            style={{ backgroundColor: theme[orientationName].textColor }}
          />
          <div className={"flex flex-wrap"}>
            {postsList.map((post: object, index: number) => (
              <>
                <div
                  key={post.id}
                  className={"w-1/5 relative"}
                  style={{ paddingBottom: "20%" }}
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
                      // style={{ height: "70%" }}
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
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrientationPostsList;

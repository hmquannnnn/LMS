"use client";

// import { div, Divider, div } from "antd";
import { filterPostsByStatus } from "@/app/classroom/[classId]/pending-posts/page";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { assignmentStatus } from "@/utils/constant";
import paths from "@/app/paths";

// const thumbnailHeight = "70%";
// const titleHeight = "12%";
// const authorHeight = "12%";
// const totalContentHeight = thumbnailHeight + titleHeight + authorHeight;
// const gapHeight = 1 - totalContentHeight;

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
      const duplicatedPosts = [...filteredPosts, ...filteredPosts, ...filteredPosts, ...filteredPosts, ...filteredPosts, ...filteredPosts, ...filteredPosts, ...filteredPosts, ...filteredPosts, ...filteredPosts];
      // console.log("raw: ", filteredPosts);
      await setPostsList(duplicatedPosts);
    };

    fetchPosts();
  }, []);
  console.log(postsList);
  return (
    <>
      <div className={"h-full lg:mx-auto w-4/6 flex mb-8"}>
        <div className={"px-10"}>
          <div
            className={
              "h-full bg-green_5 rounded-xl flex justify-center items-center shadow-xl px-3"
            }
          >
            <div
              className={"text-center text-green_6 font-bold text-2xl"}
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >

            </div>
          </div>
        </div>

        <div >
          <p className={"italic font-timesNewRoman text-lg"}>
            Chào mừng các em đến với cộng đồng nhóm ngành Xã hội. Khối Xã hội
            bao gồm nhiều ngành nghề khác nhau, nhưng chủ yếu đều liên quan đến
            con người và xã hội, được chia thành các nhóm chính như: Nhóm ngành
            Luật, Quản lý nhà nước; Nhóm ngành Truyền thông, Báo chí; Nhóm ngành
            Giáo dục; Nhóm ngành Phiên dịch; Nhóm ngành Văn hóa và Du lịch; ...
            Khối nhóm ngành này sẽ phù hợp với những bạn ...
          </p>
          <div className={"bg-green_4 my-3 h-[2px]"} />
          <div className={"flex flex-wrap"}>
            {postsList.map((post: object, index: number) => (
              <>
                <div
                  key={post.id}
                  className={"w-1/5 relative "}
                  style={{ paddingBottom: "20%" }}
                >
                  <div
                    className={"cell bg-green_1 rounded-3xl p-3 cursor-pointer"}
                    style={{
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
                      className={
                        "h-full w-full bg-green_6 rounded-2xl max-w-full"
                      }
                    // style={{ height: "70%" }}
                    ></div>
                    <div
                      className={
                        "h-full w-full bg-green_6 rounded-2xl px-3 max-w-full text-ellipsis overflow-hidden flex  items-center"
                      }
                    // style={{ height: "12%" }}
                    >
                      <p
                        className={
                          "uppercase text-green_3 font-semibold text-lg max-h-full truncate h-fit leading-none"
                        }
                      >
                        {post.title}
                      </p>
                    </div>
                    <div
                      className={
                        "h-full w-full bg-green_6 rounded-2xl px-3 truncate max-w-full flex  items-center"
                      }
                    // style={{ height: "12%" }}
                    >
                      <p className={"text-green_3"}>
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

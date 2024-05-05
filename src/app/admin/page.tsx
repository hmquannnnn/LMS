"use client";

import { useRouter } from "next/navigation";
import paths from "@/app/paths";

const AdminPage = () => {
  const router = useRouter();

  return (
    <div className={"flex flex-col"}>
      <div className={"h-14"}></div>
      <h1>Hello admin</h1>
      <div className={"flex flex-col min-h-[59vh]"}>
        <button
          className={
            "font-semibold bg-pink-300 rounded-xl px-4 py-2 my-2 text-white w-96"
          }
          onClick={() => router.push(`${paths.admin}/${paths.uploadDocument}`)}
        >
          Đăng ngữ liệu
        </button>
        <button
          className={
            "font-semibold bg-pink-300 rounded-xl px-4 py-2 my-2 text-white w-96"
          }
          onClick={() => router.push(`${paths.admin}/document`)}
        >
          Quản lý ngữ liệu
        </button>
        <button
          className={
            "font-semibold bg-pink-300 rounded-xl px-4 py-2 my-2 text-white w-96"
          }
          onClick={() => router.push(`${paths.admin}/${paths.createTest}`)}
        >
          Tạo bài tập ngữ liệu
        </button>
      </div>
    </div>
  );
};

export default AdminPage;

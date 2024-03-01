"use client";
import paths from "@/app/paths";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { doLogOutAction } from "@/redux/slices/accountSlice";

const LoggedInDropdown = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(doLogOutAction());
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={`${paths.profile}`}>Profile</Link>,
    },
    {
      key: "2",
      label: (
        <Link href={`${paths.library}/${paths.favoriteDocumentations}`}>
          Favorite List
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link href={`${paths.library}`} onClick={handleLogOut}>
          Log out
        </Link>
      ),
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="bottom" arrow={true}>
        {/*<Button>bottom</Button>*/}
        <p
          className={
            "text-white font-semibold decoration-white text-lg cursor-pointer border border-transparent rounded-lg hover:border-white px-2 py-1"
          }
          onClick={() => router.push(paths.profile)}
        >
          Hello, {user.username}
        </p>
      </Dropdown>
    </>
  );
};

export default LoggedInDropdown;

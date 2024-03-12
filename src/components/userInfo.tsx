"use client";

const UserInfo = ({ label, value }) => {
  return (
    <div className={"grid grid-cols-12 my-1 w-full"}>
      <p className={"font-semibold 2xl:col-span-2 col-span-3"}>{label}</p>
      <p className={"2xl:col-span-10 col-span-9"}>{value}</p>
    </div>
  );
};

export default UserInfo;

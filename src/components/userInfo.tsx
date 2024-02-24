"use client";

const UserInfo = ({ label, value }) => {
  return (
    <div className={"grid grid-cols-12"}>
      <p className={"font-semibold col-span-2"}>{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default UserInfo;

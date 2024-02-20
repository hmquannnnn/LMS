import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.account.user);
  return (
    <>
      <div className="min-h-[82vh]">{user.id}</div>
    </>
  );
};

export default Profile;
import React, { useContext } from "react";
import { UserContext } from "../../Providers/UserProvider";
import { auth } from "../Firebase";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const { displayName, email } = user;
  return (
    <div>
      <h2 >{displayName}</h2>
      <h3 >{email}</h3>
      <button onClick={() => { auth.signOut() }}>Sign out</button>
    </div>
  )
};
export default ProfilePage;
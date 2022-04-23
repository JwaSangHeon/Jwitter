import React from "react";
import { useNavigate } from "react-router-dom";

import { authService } from "../fbase";

const Profile = () => {
  const navigate = useNavigate();
  const onClickLogOut = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <>
      <button onClick={onClickLogOut}>Log out</button>
    </>
  );
};
export default Profile;

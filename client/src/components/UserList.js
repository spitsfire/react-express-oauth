import React from "react";
import Logout from "./Logout";
import "./UserList.css";

const UserList = ({ user }) => {
  return (
    <div class="block">
      <h1>{user.name}</h1>
      <Logout />
    </div>
  );
};

export default UserList;

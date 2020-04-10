import {Link} from "react-router-dom";
import {getUserName, logoffFromProject, useGetAuth} from "../../auth/authAccessors";
import React from "react";

export const NavbarUserAvatar = () => {

  const auth = useGetAuth();
  const userName = getUserName(auth);

  return (
    <Link to="/dashboarduser" onClick={() => {
      logoffFromProject(auth);
    }}>
      {userName && <span><i className="fas fa-user"/>{" "}{userName}</span>}
    </Link>
  )
};

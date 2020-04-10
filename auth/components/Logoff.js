import {api} from "../../api/apiEntryPoint";
import {DashboardUserInnerMargins} from "../../../components/dashboardUser/DashboardUser.styled";
import {logoutUser} from "../authApiCalls";
import React from "reactn";
import {useAuth} from "../authAccessors";
import {Button} from "react-bootstrap";

export const Logoff = (props) => {

  const auth = useAuth();

  return (
    <div>
      <DashboardUserInnerMargins>
        {props.tagline}
      </DashboardUserInnerMargins>
      <Button variant={"danger"}
              onClick={() => api(auth, logoutUser)}
      ><i className="fas fa-sign-out-alt"/> Logout</Button>
    </div>
  )
};

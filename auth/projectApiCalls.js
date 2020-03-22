import axios from "axios";

// Create Project
export const createProject = async project => {
  return await axios.post("/gapi/user/createProject/", {project});
};

export const deleteProject = async project => {
  return await axios.delete("/gapi/user/deleteProject/", {data: {project}});
};

export const sendInvitationToProject = async (adminuser, project, persontoadd) => {
  return await axios.put("/gapi/user/invitetoproject", {adminuser, project, persontoadd});
};

export const acceptInvitationToJoinProject = async (project, email) => {
  return await axios.put("/gapi/user/acceptInvitation/", {email, project});
}

export const declineInvitationToJoinProject = async (project, persontoadd) => {
  return await axios.delete("/gapi/user/invitetoproject/", {data: {project, persontoadd}});
}

export const loginIntoProject = async project => {
  return await axios.post(`/gapi/refreshtoken/${project}`);
};

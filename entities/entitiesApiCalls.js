// Add post
import axios from "axios";
import {octetStreamHeader} from "../api/apiEntryPoint";
import {insertAntiForgeryTokenHeaders} from "../auth/authAccessors";

export const addEntity = async (group, fileName, fileData)  => {
  const urlEnc = encodeURIComponent(fileName);
  const headers = insertAntiForgeryTokenHeaders(octetStreamHeader());
  return await axios.post("/gapi/fs/" + group + "/" + urlEnc,
    fileData,
    headers
  );
};

export const removeEntity = async (id)  => {
  const headers = insertAntiForgeryTokenHeaders(octetStreamHeader());
  return await axios.delete(`/gapi/entitymanager/${id}`, headers);
};

export const deleteEntity = async (id)  => {
  return removeEntity(id);
};

const placeHolderEntityMaker = group => {
  return "entities/placeholder/" + group;
};

export const addPlaceHolderEntity = async group  => {
    const res = await axios.post(placeHolderEntityMaker(group));

    return res;

    // const entityFull = {
    //   entity: res.data,
    //   blobURL: null
    // };
    //
    // dispatch({
    //   type: GET_ENTITY,
    //   payload: entityFull,
    //   requirePlaceHolder: true
    // });
};

export const getEntitiesOfGroup = async (group, project) => {
  return await axios.get(`/api/entities/metadata/list/${group}/${project}`);

  // dispatch({
  //   type: dtype,
  //   payload: {data: res.data, group: group}
  // });

};

// // Get entries
// export const getEntitiesOfGroup = (group, project) => async dispatch => {
//   try {
//     dispatch({
//       type: GET_ENTITY_LIST_PRELOAD,
//       payload: group
//     });
//
//     let res = null;
//     let dtype = GET_ENTITIES;
//     res = await axios.get(`/api/entities/metadata/list/${group}/${project}`);
//     dispatch({
//       type: dtype,
//       payload: {data: res.data, group: group}
//     });
//   } catch (err) {
//     console.log(err);
//     dispatch({
//       type: ENTITY_ERROR,
//       payload: {msg: err.response}
//     });
//   }
// };

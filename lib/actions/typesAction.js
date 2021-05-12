import axios from 'axios';
import { GET_ALL_TYPES, ADD_NEW_TYPE } from '../constants/actionType';
import apiUrl from "../config"
const addAllTypes = types => ({
  type: GET_ALL_TYPES,
  types,
});

/**
 * Gets all types from the database
 * @export
 * @returns {void}
 */
export function getTypes() {
  return dispatch =>
    axios.get(`${apiUrl}/api/v1/types`).then(({ data }) => {
      dispatch(addAllTypes(data));
    });
}

/**
 * Add new document type to the database
 * @export
 * @param {any} data
 * @returns {void}
 */
export function addNewType(data) {
  return dispatch =>
    axios.post(`${apiUrl}/api/v1/types`, data).then(
      () => {
        dispatch(getTypes());
        return true;
      },
      ({ response }) => {
        return false;
        console.log(response.data);
      },
    );
}

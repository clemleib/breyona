import axios from 'axios';
import apiUrl from "../config"
import {
  ADD_NEW_DOCUMENT,
  GET_ALL_DOCUMENTS,
  ADD_SINGLE_DOCUMENT,
  ADD_USERS_DOCUMENTS
} from '../constants/actionType';

const addAllDocumentsToState = documents => ({
  type: GET_ALL_DOCUMENTS,
  documents
});

const addNewDocumentToState = document => ({
  type: ADD_NEW_DOCUMENT,
  document
});

const addUsersDocumentToState = documents => ({
  type: ADD_USERS_DOCUMENTS,
  documents
});

const addSingleDocumentToState = document => ({
  type: ADD_SINGLE_DOCUMENT,
  document
});

/**
 * Gets all the documents
 * @function getAllDocuments
 * @export
 * @returns {void}
 */
export function getAllDocuments() {
  return dispatch =>
    axios.get(`${apiUrl}/api/v1/documents`).then(
      ({ data }) => {
        dispatch(addAllDocumentsToState(data));
      },
      ({ response }) => {
        console.log(response.error);
      }
    );
}

/**
 * Gets all the documents
 * @function getSignleDocument
 * @param {int} id
 * @export
 * @returns {void}
 */
export function getSingleDocument(id) {
  return dispatch =>
    axios.get(`${apiUrl}/api/v1/documents/${id}`).then(
      ({ data }) => {
        dispatch(addSingleDocumentToState(data));
      },
      ({ response }) => {
        console.log(response.error);
      }
    );
}

/**
 * Gets all the documents
 * @function getSignleDocument
 * @param {int} id
 * @export
 * @returns {void}
 */
export function getUserDocuments(id) {
  return dispatch =>
    axios.get(`${apiUrl}/api/v1/documents/user/${id}`).then(
      ({ data }) => {
        dispatch(addUsersDocumentToState(data));
      },
      ({ response }) => {
        console.log(response.error); //
      }
    );
}

/**
 * Gets all the documents
 * @function getSignleDocument
 * @param {int} doc
 * @export
 * @returns {void}
 */
export function addNewDocument(doc) {
  return dispatch =>
    axios.post(`${apiUrl}/api/v1/documents/`, doc).then(
      ({ data }) => {
        dispatch(getAllDocuments());
        return true;
      },
      ({ response }) => {
        console.log(response.error);
        return false;
      }
    );
}

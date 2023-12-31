import {
  TODO_ADD_ERROR,
  TODO_ADD_REQUEST,
  TODO_ADD_SUCCESS,
  TODO_DELETE_ERROR,
  TODO_DELETE_REQUEST,
  TODO_DELETE_SUCCESS,
  TODO_GET_ERROR,
  TODO_GET_REQUEST,
  TODO_GET_SUCCESS,
  TODO_TOGGLE_COMPLETION_ERROR,
  TODO_TOGGLE_COMPLETION_REQUEST,
  TODO_TOGGLE_COMPLETION_SUCCESS,
  TODO_UPDATE_ERROR,
  TODO_UPDATE_REQUEST,
  TODO_UPDATE_SUCCESS,
} from "./actionType";
import axios from "axios";

export const GetTodo = () => (dispatch) => {
  dispatch({ type: TODO_GET_REQUEST });
  axios
    .get(`https://sparkling-visor-deer.cyclic.app/Todo`)
    .then((res) => {
      console.log(res.data)
      dispatch({ type: TODO_GET_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: TODO_GET_ERROR, error: err });
    });
};

export const AddTodo = (payload) => (dispatch) => {
  dispatch({ type: TODO_ADD_REQUEST });
  return axios
    .post(`https://sparkling-visor-deer.cyclic.app/Todo/add`, payload)
    .then((res) => {
      dispatch(GetTodo());
      dispatch({ type: TODO_ADD_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: TODO_ADD_ERROR, error: err });
    });
};

export const DeletedTodo = (id) =>(dispatch) => {
  dispatch({ type: TODO_DELETE_REQUEST });
  return axios
    .delete(`https://sparkling-visor-deer.cyclic.app/Todo/delete/${id}`)
    .then(() => {
      dispatch({ type: TODO_DELETE_SUCCESS, id: id });
    })
    .catch((err) => {
      dispatch({ type: TODO_DELETE_ERROR, error: err });
    });
};

export const UpdateTodo = (id, payload) => (dispatch) => {
  dispatch({ type: TODO_UPDATE_REQUEST });
  return axios
    .patch(`https://sparkling-visor-deer.cyclic.app/Todo/update/${id}`, payload)
    .then((res) => {
      dispatch({ type: TODO_UPDATE_SUCCESS, payload: res.data, id: id });
    })
    .catch((err) => {
      dispatch({ type: TODO_UPDATE_ERROR, error: err });
    });
};

export const ToggleTodoCompletion = (id, status) => (dispatch) => {
  dispatch({ type: TODO_TOGGLE_COMPLETION_REQUEST });
  return axios
    .put(`https://sparkling-visor-deer.cyclic.app/Todo/toggle/${id}`, {
      status,
    })
    .then((res) => {
      console.log("Toggle success:", res.data);
      dispatch({
        type: TODO_TOGGLE_COMPLETION_SUCCESS,
        payload: res.data,
        id: id,
      });
    })
    .catch((err) => {
      dispatch({ type: TODO_TOGGLE_COMPLETION_ERROR, error: err });
    });
};

import axios from "axios";
import {
  DELETE_TODO,
  GET_TODOS_FAILURE,
  GET_TODOS_REQUEST,
  GET_TODOS_SUCCESS,
} from "./actionType";

const getTodosRequest = () => ({
  type: GET_TODOS_REQUEST,
});

const getTodosSuccess = (todos) => ({
  type: GET_TODOS_SUCCESS,
  payload: todos,
});

const getTodosFailure = (error) => ({
  type: GET_TODOS_FAILURE,
  payload: error,
});
const deleteTodoSuccess = (id) => ({
  type: DELETE_TODO,
  payload: id,
});
export const fetchTodos = () => async (dispatch) => {
  dispatch(getTodosRequest());

  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users/1/todos"
    );
    const todos = response.data;
    console.log(todos);
    dispatch(getTodosSuccess(todos));
  } catch (error) {
    dispatch(getTodosFailure(error.message));
  }
};
// -----------------------------------

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    dispatch(deleteTodoSuccess(id));
  } catch (error) {
    console.error("Error deleting todo:", error.message);
  }
};

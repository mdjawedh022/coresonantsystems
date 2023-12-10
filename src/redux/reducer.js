import { DELETE_TODO, GET_TODOS_FAILURE, GET_TODOS_REQUEST, GET_TODOS_SUCCESS } from "./actionType";


const initialState = {
  todos: [],
  loading: false,
  error:false,
};

const todoReducer = (state = initialState,{type,payload}) => {
  switch (type) {
    case GET_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: payload,
        error: false,
      };
    case GET_TODOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload),
      };
    default:
      return state;
  }
};

export default todoReducer;
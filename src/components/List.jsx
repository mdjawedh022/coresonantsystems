import { Box, Button, Checkbox, Spinner, Text} from "@chakra-ui/react";
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeletedTodo, GetTodo, ToggleTodoCompletion } from "../redux/action";
import {MdDelete} from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";


const List = () => {
  const dispatch = useDispatch(); 
   const { todo, isLoading } = useSelector((state) => state.Todo);
   useEffect(() => {
     dispatch(GetTodo());
   }, [dispatch]);


    const handleToggleCompletion = (id, status) => {
      dispatch(ToggleTodoCompletion(id, { status })).then(() => {
        dispatch(GetTodo());
      });
    };

      const handleDelete = (id) => {
        dispatch(DeletedTodo(id)).then(() => {
          dispatch(GetTodo());
        });
      };
  return (
    <>
      {isLoading ? (
        <Spinner textAlign={'center'} color="red.500" />
      ) : (
        <Box p={"1rem"}>
          {todo.length > 0 &&
            todo.map((el) => {
              return (
                <Box
                  key={el._id}
                  display={"flex"}
                  justifyContent={"space-between"}
                  mt={".5rem"}
                >
                  <Text>{el.title}</Text>
                  <Box display={"flex"} gap={"5px"}>
                    <Checkbox
                      colorScheme="green"
                      checked={el.status}
                      onChange={() =>
                        handleToggleCompletion(el._id, !el.status)
                      }
                    ></Checkbox>
                    <Button colorScheme="teal">
                      <FaPencilAlt />
                    </Button>
                    <Button
                      onClick={() => handleDelete(el._id)}
                      colorScheme="red"
                    >
                      <MdDelete />
                    </Button>
                  </Box>
                </Box>
              );
            })}
        </Box>
      )}
    </>
  );
};

export default List;

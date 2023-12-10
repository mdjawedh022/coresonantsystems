import { Box, Button, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, fetchTodos } from "../redux/action";
import {
  MdDelete,
  MdOutlineDoneOutline,
  MdOutlinePendingActions,
} from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";


const List = () => {
  const dispatch = useDispatch(); 
  const [isComplete, setIsComplete] = useState([]);
  const { todos, loading } = useSelector((store) => store.todoReducer);
    // console .log(todos);
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

 const toggle = (id) => {
   setIsComplete((prevStates) => {
     const newStates = [...prevStates];
     newStates[id] = !newStates[id];
     return newStates;
   });
 };
//  ------------delete--------------------
const handleDelete = (id) => {
  dispatch(deleteTodo(id));
};
  return (
    <>
      {loading ? (
        <Text
          textAlign={"center"}
          fontSize={"1.5rem"}
          m={"1rem 0"}
          fontWeight={"600"}
        >
          Loading....
        </Text>
      ) : (
        <Box mt={"1rem"}>
          {todos.map((elem) => {
            return (
              <UnorderedList key={elem.id}>
                <ListItem
                  display={"flex"}
                  mt={".5rem"}
                  justifyContent={"space-between"}
                >
                  <Text
                    fontWeight={"600"}
                    fontSize={{ lg: "1.2rem", md: "1rem", base: ".6rem" }}
                  >
                    {elem.title}
                  </Text>
                  <Box display={"flex"} gap="5px">
                    {" "}
                    <Box onClick={() => toggle(elem.id)}>
                      {" "}
                      {isComplete[elem.id] ? (
                        <Button colorScheme="green">
                          {" "}
                          <MdOutlineDoneOutline />
                        </Button>
                      ) : (
                        <Button colorScheme="blue">
                          <MdOutlinePendingActions />
                        </Button>
                      )}
                    </Box>
                    <Button>
                      <FaPencilAlt />
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(elem.id)}
                    >
                      <MdDelete />
                    </Button>
                  </Box>
                </ListItem>
              </UnorderedList>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default List;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  DeletedTodo,
  GetTodo,
  ToggleTodoCompletion,
  UpdateTodo,
} from "../redux/action";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";

const List = () => {
  const [title, setTitle] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all"); 

  const { todo, isLoading } = useSelector((state) => state.Todo);

  useEffect(() => {
    dispatch(GetTodo());
  }, [dispatch]);

  const filteredTodos = todo.filter((el) => {
    if (statusFilter === "all") {
      return true;
    } else {
      return el.status === (statusFilter === "completed");
    }
  });

  const handleEdit = (id) => {
    setSelectedTodoId(id);
    const existingTodo = todo.find((el) => el._id === id);
    onOpen();
    if (existingTodo) {
      setTitle(existingTodo.title || "");
    }
  };

  const handleUpdate = () => {
    if (selectedTodoId) {
      dispatch(UpdateTodo(selectedTodoId, { title })).then(() => {
        onClose();
        dispatch(GetTodo());
        setTitle("");
      });
    }
  };

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
        <Spinner textAlign={"center"} color="red.500" />
      ) : (
        <Box p={"1rem"}>
          <Box display={"flex"} gap={"10px"}>
            <Button onClick={() => setStatusFilter("all")}>All</Button>
            <Button onClick={() => setStatusFilter("completed")}>
              Completed
            </Button>
            <Button onClick={() => setStatusFilter("incomplete")}>
              Incomplete
            </Button>
          </Box>

          {filteredTodos.length > 0 &&
            filteredTodos.map((el) => {
              return (
                <Box
                  key={el._id}
                  display={"flex"}
                  justifyContent={"space-between"}
                  mt={".5rem"}
                >
                  <Text>{el.title}</Text>
                  <Box display={"flex"} gap={"5px"}>
                    <input
                    type="checkbox"
                      colorScheme="green"
                      checked={el.status}
                      onChange={() =>
                        handleToggleCompletion(el._id, !el.status)
                      }
                    />
                    <Button
                      colorScheme="teal"
                      onClick={() => handleEdit(el._id)}
                    >
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

      <Modal isOpen={isOpen} onClose={onClose} backgroud={"black"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} gap={"5px"} pb={"2rem"}>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button onClick={handleUpdate}>Update</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default List;

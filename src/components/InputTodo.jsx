import { Box, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { AddTodo } from "../redux/action";
import { useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";

const InputTodo = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const handleAddTodo = (title) => {
    dispatch(AddTodo({ title: title, status: false }));
    setTitle("");
  };

  return (
    <>
      <Box
        w={{ base: "100%", md: "100%", lg: "100%" }}
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        gap={"10px"}
      >
        <Input
          placeholder="add your task.."
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleAddTodo} border={"1px"}>
          Submit
        </Button>
      </Box>
    </>
  );
};

export default InputTodo;

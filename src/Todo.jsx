import { Box, Text } from "@chakra-ui/react";
import React from "react";
import InputTodo from "./components/InputTodo";
import List from "./components/List";

const Todo = () => {
    const options = {
      month: "short",
      day: "numeric",
      weekday: "short",
    };
    const currentDay = new Date().toLocaleDateString(
      undefined,
      options
    );
  return (
    <>
      <Box
        w={{ base: "90%", md: "70%", lg: "45%" }}
        m={{ lg: "3rem auto", base: "3rem auto", md: "2rem auto" }}
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
        
        borderRadius={"5px"}
        p={"1rem"}
      >
        <Text>{currentDay}</Text>
        <Text textAlign={'center'} fontSize={'1.5rem'} m={'1rem 0'} fontWeight={'600'}>TODO LIST</Text>

        <List/>
      </Box>
    </>
  );
};

export default Todo;

import { Box, Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const InputTodo = () => {
  const [input,setInput]=useState('')

  const handelSubmit = () => {
const data={
        userId: 1,
        id: input.length + 1, 
        title: input,
        completed: false
      }
    console.log(data);
    setInput('')
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handelSubmit}border={"1px"}>Submit</Button>
      </Box>
    </>
  );
}

export default InputTodo

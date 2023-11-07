import { Input, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface Props {
  notationID: string;
  notationName: string;
  onEdit: (subTaskValue: string, id: string) => void;
}

export const EditNotation = ({
  notationID,
  notationName,
  onEdit: editNotation,
}: Props) => {
  const [value, setValue] = useState(notationName);

  const handleSubmit = (e: any) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    editNotation(notationID, value);
  };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <Flex w={"100%"} mb={1}>
        <Input
          m={0}
          bg={"white"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          borderLeftRadius={10}
          borderRightRadius={0}
        />
        <Flex
          bg={"orange.300"}
          h={10}
          w={"45px"}
          justifyContent={"center"}
          alignItems={"center"}
          // pt={2}
          // pl={4}
          // pr={3}
          gap={2}
          color={"white"}
          _hover={{ bg: "orange.400" }}
          borderRightRadius={10}
        >
          <AiOutlinePlusCircle size="1.5rem" onClick={handleSubmit} />
        </Flex>
        {/* <button type="submit" className="todo-btn">
          Add Task
        </button> */}
      </Flex>
    </form>
  );
};

export default EditNotation;

import { Input, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { SectionButton } from "./componentsList";

interface Prop {
  addTodo: (data: string) => void;
  placeHolder: string;
  buttonName: string;
}

export const AddNotation = ({ addTodo, placeHolder, buttonName }: Prop) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (value) {
      addTodo(value);
      setValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex mb={4}>
        <Input
          type="text"
          borderRightRadius={0}
          borderColor={"blue.400"}
          placeholder={placeHolder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Flex>
          <SectionButton buttonName={buttonName} onClick={() => {}} />
        </Flex>
      </Flex>
    </form>
  );
};

export default AddNotation;

import { Flex, Text, Button, Badge } from "@chakra-ui/react";
import { TasksStatus } from "../pages/Tasks";
import React from "react";

interface ColumnProps {
  tasks: React.ReactNode;
  currentProjectID: string;
  columntName: TasksStatus["status"];
  columntColor: string;
  addTask: () => void;
}

const Column = React.memo(
  ({ tasks, columntName, columntColor, addTask }: ColumnProps) => {
    return (
      <>
        <Flex
          w={"560px"}
          h={{ base: "160px", md: "auto" }}
          overflowY={"auto"}
          borderRadius={20}
          bg={columntColor}
          flexDirection={"column"}
          alignItems={"center"}
          p={3}
          gap={3}
        >
          <Flex w={"100%"} gap={4} alignItems={"center"}>
            <Badge borderRadius={50} p={1}>
              <Text mx={2}>{columntName}</Text>
            </Badge>
            <Button
              borderRadius={50}
              h={4}
              w={"100%"}
              onClick={() => addTask()}
            >
              +
            </Button>
          </Flex>
          <Flex
            overflowY={"auto"}
            w={"530px"}
            h={"100%"}
            flexDirection={{ base: "row", md: "column" }}
            gap={3}
          >
            {tasks}
          </Flex>
        </Flex>
      </>
    );
  }
);

export default Column;

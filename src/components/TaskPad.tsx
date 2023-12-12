import { Flex, Text, Box, HStack } from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IoTrashBinSharp, BiEdit, MdDragIndicator } from "../utilities/icons";
import TimeLeftBadge from "./badges/TimeLeftBadge";
import { Tasks, TasksStatus } from "../pages/Tasks";
import React, { useState } from "react";
import ActiveSubTaskBadge from "././badges/ActiveSubTaskBadge";

interface Prop {
  task: Tasks;
  onDelete: (id: string) => void;

  onEdit: (id: string) => void;
}

const TaskPad = React.memo(({ onEdit, onDelete, task }: Prop) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      status: task.status as TasksStatus["status"],
      type: "Task",
      task,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  if (isDragging) {
    return (
      <HStack
        border={"3px dotted"}
        borderColor={"blue.300"}
        bg={"blue.100"}
        borderRadius={10}
        h={16}
        w={{ base: "243px", md: "100%" }}
        ref={setNodeRef}
        style={style}
        opacity={0.7}
      />
    );
  }
  return (
    <HStack
      w={{ base: "243px", md: "100%" }}
      // w={{ base: "49%", md: "100%" }}
      // w={"100%"}
      // w={"250px"}
      gap={0}
      mr={0}
      h={16}
      ref={setNodeRef}
      style={style}
    >
      <Flex
        {...attributes}
        {...listeners}
        bg={"orange.300"}
        h={"100%"}
        w={"7%"}
        // w={"36px"}
        gap={2}
        color={"white"}
        _hover={{ bg: "orange.400" }}
        borderLeftRadius={10}
        justifyContent={"center"}
        alignItems={"center"}
        cursor={"-webkit-grab"}
      >
        <MdDragIndicator style={{ margin: "1px" }} size={"20px"} />
      </Flex>
      <Flex
        // w={"100%"}
        w={"80%"}
        h={"100%"}
        bg={"blue.400"}
        color={"white"}
        pt={1.5}
        pl={3}
        pr={2}
        // justifyContent={"center"}
        // alignItems={"center"}
        // cursor={"none"}
      >
        <Flex
          w={"100%"}
          // w={"404px"}
        >
          <Flex w={"100%"} flexDirection={"column"} gap={1.5}>
            <Flex px={0} m={0}>
              <Text
                // textOverflow={"clip"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
              >
                {task.taskName}
              </Text>
            </Flex>
            <Flex
              gap={2}
              flexDirection={"row-reverse"}
              alignItems={"center"}
              px={0}
            >
              <ActiveSubTaskBadge currentTaskID={task.id} />
              <TimeLeftBadge task={task} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        bg={"orange.300"}
        h={"100%"}
        w={"13%"}
        // w={"70px"}
        // pt={3}
        // pl={3}
        gap={2}
        color={"white"}
        _hover={{ bg: "orange.400" }}
        borderRightRadius={10}
        flexDirection={{
          base: "column",
          sm: "column",
          md: "column",
          xl: "row",
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <BiEdit onClick={() => onEdit(task.id)} size={"18px"} />
        <IoTrashBinSharp onClick={() => onDelete(task.id)} size={"18px"} />
      </Flex>
    </HStack>
  );
});

export default TaskPad;

import { Flex, Text, Button, Badge } from "@chakra-ui/react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import TaskPad from "./TaskPad";
import { Tasks, TasksStatus } from "../pages/Tasks";
import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { SortableContext } from "@dnd-kit/sortable";

interface ColumnProps {
  today?: DateTime;
  tasks: Tasks[];
  currentProjectID: string;
  columntName: TasksStatus["status"];
  columntColor: string;
  addTask: () => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const Column = React.memo(
  ({
    today,
    tasks,
    columntName,
    columntColor,
    addTask,
    onDelete,
    onEdit,
  }: ColumnProps) => {
    const tasksIds = useMemo(() => {
      return tasks.map((task) => task.id);
    }, [tasks]);

    return (
      <>
        <Flex
          w={"560px"}
          h={{ base: "160px", md: "auto" }}
          overflowY={"auto"}
          // overflowX={"hidden"}
          borderRadius={20}
          bg={columntColor}
          flexDirection={"column"}
          alignItems={"center"}
          p={3}
          gap={3}
          // px={20}
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
            // overflowY={"auto"}
            w={"530px"}
            h={"100%"}
            flexDirection={{ base: "row", md: "column" }}
            gap={3}
          >
            <SortableContext items={tasksIds}>
              {tasks.map((task) => (
                <TaskPad
                  // today={today}
                  task={task}
                  onDelete={() => onDelete(task.id)}
                  onEdit={(id) => onEdit(id)}
                  key={task.id}
                />
              ))}
            </SortableContext>
          </Flex>
        </Flex>
      </>
    );
  }
);

export default Column;

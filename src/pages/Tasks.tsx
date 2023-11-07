import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Column from "../components/Column";
import AllModal from "../components/AllModal";
import EditTask from "../components/EditTask";
import {
  addTask,
  editTask,
  deleteTask,
  selectAllTasks,
  selectQueueTasks,
  selectDevelopmentTasks,
  selectDoneTasks,
} from "../store/tasksReducer";
import store from "../store/store";
import { useSelector } from "react-redux";

import React from "react";

export interface TasksStatus {
  status: "queue" | "development" | "done";
}
export interface Tasks {
  id: string;
  taskName: string;
  currentProjectID: string;
  status: TasksStatus["status"];
  description: string;
  creationDate: string;
  timeSpent: string;
  dueDate?: string;
}
export interface SubTasks {
  id: string;
  subTaskName: string;
  currentTaskID: string;
  isEditing: boolean;
  complited: boolean;
}

const ProjectsTasks = React.memo(() => {
  let { state: currentProject } = useLocation();
  // const [tasksStore, dispatch] = useReducer(tasksReducer, []);

  // ==============================TASK FILTER=========================
  const tasksStore = useSelector(selectAllTasks);
  // const tasksOfTheCurrentProject = useSelector(
  //   selectTasksOfTheCurrentProject(currentProject.id)
  // );
  const queueTasks = useSelector(selectQueueTasks);
  const developmentTasks = useSelector(selectDevelopmentTasks);
  const doneTasks = useSelector(selectDoneTasks);
  // ==============================COLUMNS=============================
  const columnsArray: {
    status: TasksStatus["status"];
    columntColor: string;
    tasks: Tasks[];
  }[] = [
    { status: "queue", columntColor: "green.200", tasks: queueTasks },
    {
      status: "development",
      columntColor: "purple.200",
      tasks: developmentTasks,
    },
    { status: "done", columntColor: "pink.200", tasks: doneTasks },
  ];

  // ==============================MODAL=============================
  const [isOpen1, setIsOpen1] = useState(false);
  const [currentTask, setCurrentTask] = useState({} as Tasks);

  const openModal = (id: string) => {
    const currentTask = tasksStore.filter((task) => task.id === id);
    setCurrentTask(currentTask[0]);
    setIsOpen1(true);
  };

  // ==============================ADD=============================
  const addTaskToStore = (status: TasksStatus["status"]) => {
    store.dispatch(
      addTask(
        `new ${status} Task`,
        currentProject.projectID,
        "",
        status,
        DateTime.now().toFormat("yyyy-MM-dd"),
        "",
        ""
      )
    );
  };
  // ==============================DELETE=============================
  const onDelete = (id: string) => {
    store.dispatch(deleteTask(id));
  };

  // ==============================EDIT================================
  const onEdit = (
    id: string,
    taskName: string,
    description: string,
    status: TasksStatus["status"],
    dueDate?: string
  ) => {
    store.dispatch(editTask(id, taskName, description, status, dueDate));
  };

  // ==============================RENDER FASE===============================

  return (
    <>
      <AllModal
        size={"xl"}
        title={"Edit task"}
        onOpen={isOpen1}
        onClose={() => setIsOpen1(false)}
        children={
          <EditTask
            submit={() => setIsOpen1(false)}
            currentTask={currentTask}
            onEdit={onEdit}
          />
        }
      />
      <VStack justifyContent={"center"} alignItems={"center"}>
        <Heading
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
          fontWeight="bold"
          textAlign="center"
          textTransform={"uppercase"}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          mt={4}
        >
          {currentProject.projectName}
        </Heading>
        <Flex bg={"blue.100"} borderRadius={20} p={4}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 4 }}>
            {columnsArray.map((column, index) => (
              <Column
                key={index}
                onEdit={openModal}
                onDelete={onDelete}
                // today={today}
                tasks={column.tasks.filter(
                  (task) => task.currentProjectID === currentProject.projectID
                )}
                addTask={() => addTaskToStore(column.status)}
                currentProjectID={currentProject.projectID}
                columntName={column.status}
                columntColor={column.columntColor}
              />
            ))}
          </SimpleGrid>
        </Flex>
      </VStack>
    </>
  );
});

export default ProjectsTasks;

import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useLocation } from "react-router-dom";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import Column from "../components/Column";
import AllModal from "../components/AllModal";
import EditTask from "../components/EditTask";
import TaskPad from "../components/TaskPad";
import {
  addTask,
  editTask,
  deleteTask,
  selectAllTasks,
  selectQueueTasks,
  selectDevelopmentTasks,
  selectDoneTasks,
  reorderTasks,
  setTask,
} from "../store/tasksReducer";
import store from "../store/store";
import { useSelector } from "react-redux";
import { Reorder } from "framer-motion";

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

const ProjectsTasks = () => {
  let { state: currentProject } = useLocation();

  // ==============================TASK FILTER=========================
  const tasksStore = useSelector(selectAllTasks);
  const queueTasks = useSelector(selectQueueTasks).filter(
    (task) => task.currentProjectID === currentProject.projectID
  );
  const developmentTasks = useSelector(selectDevelopmentTasks).filter(
    (task) => task.currentProjectID === currentProject.projectID
  );
  const doneTasks = useSelector(selectDoneTasks).filter(
    (task) => task.currentProjectID === currentProject.projectID
  );

  // ==============================DnD FUNCTIONALITY===================
  const [queueTasksList, setQueueTasksList] = useState<Tasks[]>(queueTasks);
  const [developmentTasksList, setDevelopmentTasks] =
    useState<Tasks[]>(developmentTasks);
  const [doneTasksList, setDoneTasksList] = useState<Tasks[]>(doneTasks);

  // ==============================COLUMNS=============================
  const columnsArray: {
    id: number;
    status: TasksStatus["status"];
    columntColor: string;
    tasks: Tasks[];
    setTasks: Dispatch<SetStateAction<Tasks[]>>;
  }[] = [
    {
      id: 1,
      status: "queue",
      columntColor: "green.200",
      tasks: queueTasks,
      setTasks: setQueueTasksList,
    },
    {
      id: 2,
      status: "development",
      columntColor: "purple.200",
      tasks: developmentTasks,
      setTasks: setDevelopmentTasks,
    },
    {
      id: 3,
      status: "done",
      columntColor: "pink.200",
      tasks: doneTasks,
      setTasks: setDoneTasksList,
    },
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
  //==================================REORDER TASKS========================
  useEffect(() => {
    store.dispatch(
      reorderTasks(
        queueTasksList,
        developmentTasksList,
        doneTasksList,
        currentProject.projectID
      )
    );
  }, [queueTasksList, developmentTasksList, doneTasksList]);
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
          <SimpleGrid
            display={"flex"}
            gap={3}
            // columns={{ base: 1, md: 3 }}
            // spacing={{ base: 4, md: 4 }}
          >
            {columnsArray.map((col) => (
              <Reorder.Group
                onReorder={col.setTasks}
                values={col.tasks}
                // key={col.id}
              >
                <Column
                  key={col.id}
                  addTask={() => addTaskToStore(col.status)}
                  currentProjectID={currentProject.projectID}
                  columntName={col.status}
                  columntColor={col.columntColor}
                  tasks={col.tasks.map((task) => (
                    <TaskPad
                      key={task.id}
                      task={task}
                      onDelete={() => onDelete(task.id)}
                      onEdit={openModal}
                    />
                  ))}
                />
              </Reorder.Group>
            ))}
          </SimpleGrid>
        </Flex>
      </VStack>
    </>
  );
};

export default ProjectsTasks;

import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
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
import { createPortal } from "react-dom";
import TaskPad from "../components/TaskPad";

import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { DateTime } from "luxon";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

import Column from "../components/Column";
import AllModal from "../components/AllModal";
import EditTask from "../components/EditTask";
import {
  addTask,
  editTask,
  deleteTask,
  selectAllTasks,
  selectTasksOfTheCurrentProject,
  setTask,
} from "../store/tasksReducer";
import store from "../store/store";
import { useSelector } from "react-redux";

import React from "react";

export interface TasksStatus {
  status: "queue" | "development" | "done";
}
export interface Columns {
  status: TasksStatus["status"];
  columntColor: string;
  tasks: Tasks[];
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

  // ==============================TASK FILTER=========================
  const currenTasksStore = useSelector(
    selectTasksOfTheCurrentProject(currentProject.projectID)
  );
  const queueTasks = currenTasksStore.filter(
    (tasks) => tasks.status === "queue"
  );
  const developmentTasks = currenTasksStore.filter(
    (tasks) => tasks.status === "development"
  );
  const doneTasks = currenTasksStore.filter((tasks) => tasks.status === "done");

  const tasksStore = useSelector(selectAllTasks);

  // ==============================COLUMNS=============================
  const columnsArray: Columns[] = [
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

  // ==============================DND FUNCTIONALITY=========================

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const [tasks, setTasks] = useState<Tasks[]>(currenTasksStore);
  const [activeTask, setActiveTask] = useState<Tasks | null>(null);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // const isActiveAColumn = active.data.current?.type === "Column";
    // if (!isActiveAColumn) return;

    // console.log("DRAG END");
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    // const overId = over.id as string | TasksStatus["status"];
    console.log("drag over", overId);
    // const overId: TasksStatus["status"] = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t: Tasks) => t.id === activeId);
        const overIndex = tasks.findIndex((t: Tasks) => t.id === overId);

        if (tasks[activeIndex].status !== tasks[overIndex].status) {
          // Fix introduced after video recording
          tasks[activeIndex].status = tasks[overIndex].status;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].status = overId as TasksStatus["status"];
        // console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
  useEffect(() => {
    store.dispatch(setTask(tasks, currentProject.projectID));
  }, [tasks]);

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
            <DndContext
              sensors={sensors}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onDragOver={onDragOver}
            >
              {columnsArray.map((column, index) => (
                <Column
                  column={column}
                  key={index}
                  onEdit={openModal}
                  onDelete={onDelete}
                  // today={today}
                  tasks={column.tasks}
                  addTask={() => addTaskToStore(column.status)}
                  currentProjectID={currentProject.projectID}
                  columntName={column.status}
                  columntColor={column.columntColor}
                />
              ))}
              {createPortal(
                <DragOverlay>
                  {activeTask && (
                    // <Flex bg={"blue.100"} w={"100%"} />
                    <TaskPad
                      task={activeTask}
                      onDelete={() => onDelete(activeTask.id)}
                      onEdit={openModal}
                      key={activeTask.id}
                    />
                  )}
                </DragOverlay>,
                document.body
              )}
            </DndContext>
          </SimpleGrid>
        </Flex>
      </VStack>
    </>
  );
});

export default ProjectsTasks;

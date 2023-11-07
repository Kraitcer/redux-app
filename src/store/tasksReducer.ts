import { Tasks, TasksStatus } from "../pages/Tasks";
import { createSelector } from "reselect";
import { v4 } from "uuid";

// ===============================ACTION TYPES=========================
type TaskAction =
  | {
      type: "ADD_TASK";
      payload: {
        taskName: string;
        currentProjectID: string;
        description: string;
        status: TasksStatus["status"];
        creationDate: string;
        timeSpent: string;
        dueDate: string;
      };
    }
  | { type: "DELETE_TASK"; payload: string }
  | {
      type: "EDIT_TASK";
      payload: {
        id: string;
        taskName: string;
        description: string;
        status: TasksStatus["status"];
        dueDate?: string;
      };
    }
  // | { type: "COMPLETE_TASK"; payload: string }
  | { type: "SET_TASKS"; payload: Tasks[] };

// =======================================ACTIONS============================
export const addTask = (
  taskName: string,
  currentProjectID: string,
  description: string,
  status: TasksStatus["status"],
  creationDate: string,
  timeSpent: string,
  dueDate: string
): TaskAction => ({
  type: "ADD_TASK",
  payload: {
    taskName,
    currentProjectID,
    description,
    status,
    creationDate,
    timeSpent,
    dueDate,
  },
});

export const editTask = (
  id: string,
  taskName: string,
  description: string,
  status: TasksStatus["status"],
  dueDate?: string
): TaskAction => ({
  type: "EDIT_TASK",
  payload: { id, taskName, description, status, dueDate },
});

export const deleteTask = (id: string): TaskAction => ({
  type: "DELETE_TASK",
  payload: id,
});

export const setTask = (task: Tasks[]): TaskAction => ({
  type: "SET_TASKS",
  payload: task,
});

// ===============================REDUCER=========================

export const tasksReducer = (
  state: Tasks[] = [],
  action: TaskAction
): Tasks[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: v4(),
          taskName: action.payload.taskName,
          currentProjectID: action.payload.currentProjectID,
          status: action.payload.status,
          description: action.payload.description,
          creationDate: action.payload.creationDate,
          timeSpent: action.payload.timeSpent,
          dueDate: action.payload.dueDate,
        },
      ];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              taskName: action.payload.taskName,
              status: action.payload.status,
              description: action.payload.description,
              dueDate: action.payload.dueDate,
            }
          : task
      );
    case "SET_TASKS":
      return [...action.payload];
    default:
      return state;
  }
};
// =======================================SELECTORS============================
// Селектор для получения всех задач
const selectTasks = (state: { tasks: Tasks[] }) => state.tasks;

// Селектор для всех задач
export const selectAllTasks = createSelector([selectTasks], (tasks) => tasks);

// Селектор для задач, где status === "queue"
export const selectQueueTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((task) => task.status === "queue")
);
// Селектор для задач, где status === "development"
export const selectDevelopmentTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((task) => task.status === "development")
);
// Селектор для задач, где status === "done"
export const selectDoneTasks = createSelector([selectTasks], (tasks) =>
  tasks.filter((task) => task.status === "done")
);

// Селектор для задач текущего проекта
export const selectTasksOfTheCurrentProject = (currentProjectID: string) =>
  createSelector([selectTasks], (tasks) =>
    tasks.filter((task) => task.currentProjectID === currentProjectID)
  );

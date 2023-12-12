import { v4 } from "uuid";
import { SubTasks } from "../pages/Tasks";
import { createSelector } from "reselect";

// ===============================ACTION TYPES=========================

type SubTasksAction =
  | {
      type: "ADD_SUBTASK";
      payload: {
        subTaskName: string;
        currentTaskID: string;
        currentProjectId: string;
      };
    }
  | { type: "EDIT_SUBTASK"; payload: { id: string; subTaskName: string } }
  | { type: "DELETE_SUBTASK"; payload: string }
  | { type: "DELETE_TASK_SUBTASKS"; payload: string }
  | { type: "DELETE_PROJECT_SUBTASKS"; payload: string }
  | { type: "COMPLETE_SUBTASK"; payload: string }
  | { type: "SET_SUBTASKS"; payload: SubTasks[] };
// ==================================ACTIONS============================
export const addSubTask = (
  subTaskName: string,
  currentTaskID: string,
  currentProjectId: string
): SubTasksAction => ({
  type: "ADD_SUBTASK",
  payload: {
    subTaskName,
    currentTaskID,
    currentProjectId,
  },
});
export const editSubTask = (
  id: string,
  subTaskName: string
): SubTasksAction => ({
  type: "EDIT_SUBTASK",
  payload: {
    id,
    subTaskName,
  },
});
export const deleteSubTask = (id: string): SubTasksAction => ({
  type: "DELETE_SUBTASK",
  payload: id,
});
export const deleteTaskSubTasks = (id: string): SubTasksAction => ({
  type: "DELETE_TASK_SUBTASKS",
  payload: id,
});
export const deleteProjectSubTasks = (id: string): SubTasksAction => ({
  type: "DELETE_PROJECT_SUBTASKS",
  payload: id,
});
export const completeSubTask = (id: string): SubTasksAction => ({
  type: "COMPLETE_SUBTASK",
  payload: id,
});
export const setSubTask = (subTasks: SubTasks[]): SubTasksAction => ({
  type: "SET_SUBTASKS",
  payload: subTasks,
});
// ===============================REDUCER=========================

export const subTasksReducer = (
  state: SubTasks[] = [],
  action: SubTasksAction
): SubTasks[] => {
  switch (action.type) {
    case "ADD_SUBTASK":
      return [
        {
          id: v4(),
          subTaskName: action.payload.subTaskName,
          currentTaskID: action.payload.currentTaskID,
          currentProjectId: action.payload.currentProjectId,
          isEditing: false,
          complited: false,
        },
        ...state,
      ];

    case "EDIT_SUBTASK":
      return state.map((project) =>
        project.id === action.payload.id
          ? {
              ...project,
              isEditing: !project.isEditing,
              subTaskName: action.payload.subTaskName,
            }
          : project
      );

    case "COMPLETE_SUBTASK":
      return state.map((subTask) =>
        subTask.id === action.payload
          ? {
              ...subTask,
              complited: !subTask.complited,
            }
          : subTask
      );

    case "DELETE_SUBTASK":
      return state.filter((subTask) => subTask.id !== action.payload);
    case "DELETE_TASK_SUBTASKS":
      return state.filter(
        (subTask) => subTask.currentTaskID !== action.payload
      );
    case "DELETE_PROJECT_SUBTASKS":
      return state.filter(
        (subTask) => subTask.currentProjectId !== action.payload
      );
    case "SET_SUBTASKS":
      return [...action.payload];
    default:
      return state;
  }
};
// =======================================SELECTORS============================
// Селектор для получения всех подзадач
const selectSubTasks = (state: { subTasks: SubTasks[] }) => state.subTasks;

export const selectAllSubTasks = createSelector(
  [selectSubTasks],
  (subTasks) => subTasks
);

// Селектор для подзадач текущей задачи
export const selectSubTasksOfTheCurrentTask = (currentTaskID: string) =>
  createSelector([selectSubTasks], (subTasks) =>
    subTasks.filter((subTask) => subTask.currentTaskID === currentTaskID)
  );

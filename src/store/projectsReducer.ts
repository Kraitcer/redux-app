import { Projects } from "../pages/ProjectsList";
import { createSelector } from "reselect";
import { v4 } from "uuid";

// =======================================ACTIONS TYPES=====================
export type projectAction =
  | { type: "ADD_PROJECT"; payload: { projectName: string } }
  | { type: "EDIT_PROJECT"; payload: { id: string; projectName: string } }
  | { type: "COMPLETE_PROJECT"; payload: string }
  | { type: "DELETE_PROJECT"; payload: string }
  | { type: "SET_PROJECTS"; payload: Projects[] };

// =======================================ACTIONS============================
export const addProject = (projectName: string): projectAction => ({
  type: "ADD_PROJECT",
  payload: { projectName: projectName },
});

export const editProject = (
  id: string,
  projectName: string
): projectAction => ({
  type: "EDIT_PROJECT",
  payload: { id, projectName: projectName },
});

export const completeProject = (id: string): projectAction => ({
  type: "COMPLETE_PROJECT",
  payload: id,
});

export const deleteProject = (id: string): projectAction => ({
  type: "DELETE_PROJECT",
  payload: id,
});

export const setProjects = (projects: Projects[]): projectAction => ({
  type: "SET_PROJECTS",
  payload: projects,
});

// =======================================REDUCER============================

export const projectsReducer = (
  state: Projects[] = [],
  action: projectAction
): Projects[] => {
  switch (action.type) {
    case "ADD_PROJECT":
      return [
        {
          id: v4(),
          projectName: action.payload.projectName,
          isEditing: false,
          active: true,
          complited: false,
        },
        ...state,
      ];

    case "EDIT_PROJECT":
      return state.map((project) =>
        project.id === action.payload.id
          ? {
              ...project,
              isEditing: !project.isEditing,
              projectName: action.payload.projectName,
            }
          : project
      );

    case "COMPLETE_PROJECT":
      return state.map((project) =>
        project.id === action.payload
          ? {
              ...project,
              complited: !project.complited,
              active: !project.active,
            }
          : project
      );

    case "DELETE_PROJECT":
      return state.filter((project) => project.id !== action.payload);
    case "SET_PROJECTS":
      return [...action.payload];
    default:
      return state;
  }
};
// =======================================SELECTORS============================
// Селектор для получения всех проектов
const selectProjects = (state: { projects: Projects[] }) => state.projects;

// Селектор для проектов, где active === true
export const selectActiveProjects = createSelector(
  [selectProjects],
  (projects) => projects.filter((project) => project.active)
);

// Селектор для проектов, где complited === true
export const selectCompletedProjects = createSelector(
  [selectProjects],
  (projects) => projects.filter((project) => project.complited)
);

// Селектор для всех проектов
export const selectAllProjects = createSelector(
  [selectProjects],
  (projects) => projects
);

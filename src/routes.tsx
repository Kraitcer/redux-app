import { createBrowserRouter } from "react-router-dom";
import ProjectsList from "./pages/ProjectsList";
import Tasks from "./pages/Tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsList />,
  },
  { path: "/projectstaskbord", element: <Tasks /> },
]);

export default router;

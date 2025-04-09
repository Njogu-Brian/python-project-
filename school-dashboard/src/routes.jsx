import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Finance from "./pages/Finance";
import Settings from "./pages/Settings";
import Classes from "./pages/Classes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/students", element: <Students /> },
      { path: "/teachers", element: <Teachers /> },
      { path: "/courses", element: <Courses /> },
      { path: "/finance", element: <Finance /> },
      { path: "/settings", element: <Settings /> },
      { path: "/classes", element: <Classes /> },
    ],
  },
]);

export default routes;


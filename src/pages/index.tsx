import { createBrowserRouter } from "react-router-dom";
import { reactRouter } from "./react";

import "./styles.css";
import { Outlet, Link } from "react-router-dom";
import { homeRouter } from "./home";
import { viteRouter } from "./vite";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function App() {
  const loginUser = useSelector(
    (state: RootState) => state.authentication.auth
  );

  return (
    <>
      <div>
        <Link to={``}>Home</Link>
        <Link to={`react`}>React</Link>
        <Link to={`vite`}>Vite</Link>
      </div>
      <h1>Vite + React {loginUser.username}</h1>

      <div className="read-the-docs">
        <Outlet />
      </div>
    </>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [homeRouter, reactRouter, viteRouter],
  },
]);

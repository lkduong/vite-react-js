import { createRoot } from "react-dom/client";
import { appRouter } from "./pages";
import "./index.scss";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);

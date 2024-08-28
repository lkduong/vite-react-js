import { Counter } from "./components/counter";

export const homeRouter = {
  path: "",
  element: <HomePage></HomePage>,
};

function HomePage() {
  return (
    <>
      <Counter></Counter>
      <div>Home hello world!</div>
    </>
  );
}

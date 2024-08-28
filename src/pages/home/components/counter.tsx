import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store";
import { incrementAsync } from "../../../store/home/action";

export function Counter() {
  const count = useSelector((state: RootState) => state.home.value);
  const dispatch = useAppDispatch();
  return (
    <div className="card">
      <button onClick={() => dispatch(incrementAsync(2))}>
        count is {count}
      </button>
      <p>
        Edit <code>src/pages</code> and save to test HMR
      </p>
    </div>
  );
}

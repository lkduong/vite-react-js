import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "../../store";
import { loginThunk } from "../../store/authentication/action";

export const reactRouter = {
  path: "react",
  element: <ReactPage></ReactPage>,
};

type FormInput = {
  username: string;
};

const loginSchema = yup
  .object({
    username: yup.string().required(),
  })
  .required();

function ReactPage() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(loginThunk(data.username));
  };

  return (
    <>
      <div>ReactJS hello world!</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")}></input>
        <p>{errors.username?.message}</p>
        <input type="submit" />
      </form>
    </>
  );
}

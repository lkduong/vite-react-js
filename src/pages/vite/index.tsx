import { AuthGuard } from "../../common/auth-guard";

export const viteRouter = {
  path: "vite",
  element: (
    <AuthGuard>
      <div>Vite hello world!</div>
    </AuthGuard>
  ),
};

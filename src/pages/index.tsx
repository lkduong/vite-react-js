import { createBrowserRouter } from "react-router-dom";
import { reactRouter } from "./react";

import "./styles.scss";
import { Outlet } from "react-router-dom";
import { homeRouter } from "./home";
import { videoTranslateRouter } from "./video-translate";
// import { useSelector } from "react-redux";
// import { RootState } from "../store";
import { Breadcrumb, Layout, theme } from "antd";
import NavigationMenu from "../common/components/navigation-menu";
import { videoTrainRouter } from "./video-train";
import { videoCallRouter } from "./video-call";
import { loginPageRouter } from "./login-screen";

const { Header, Content, Footer } = Layout;
const breadCrumbs = [{ title: "Home" }, { title: "Video Call" }];

export function App() {
  // const loginUser = useSelector(
  //   (state: RootState) => state.authentication.auth
  // );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="app_layout">
      <Header className="app_header">
        <div className="demo-logo" />
        <NavigationMenu />
      </Header>
      <Content className="app_main">
        <Breadcrumb className="breadcrumb" items={breadCrumbs} />
        <div
          className="content"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        TeleDeaf Care ©{new Date().getFullYear()} Created by DC8 TMA
        Solutions.
      </Footer>
    </Layout>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [homeRouter, reactRouter, videoCallRouter, videoTrainRouter, videoTranslateRouter, loginPageRouter],
  },
]);

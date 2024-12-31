"use client";

import { Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    key: "/",
    label: <Link to="/">Home</Link>,
  },
  {
    key: "/video-call",
    label: <Link to="/video-call">Video Call</Link>,
  },
  {
    key: "/video-train",
    label: <Link to="/video-train">Video Train</Link>,
  },
  {
    key: "/video-translate",
    label: <Link to="/video-translate">Video Translate</Link>,
  },
  {
    key: "/login-screen",
    label: <Link to="/login-screen">Login</Link>,
  },
  {
    key: "/help",
    label: <Link to="/help">Help</Link>,
  }
];

export default function NavigationMenu() {
  // const pathname = usePathname();
  const [current, setCurrent] = useState("");

  useEffect(() => {
    // setCurrent(pathname);
  }, []);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["home"]}
      selectedKeys={[current]}
      items={menuItems}
      style={{ flex: 1, minWidth: 0 }}
      onClick={onClick}
    />
  );
}

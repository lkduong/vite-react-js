import { useState } from "react";
import { Button, Input, Form, Typography, Alert, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { deafCareAPI } from "../../services/deafcare-api";
import { redirect } from "react-router-dom";

const { Title, Text } = Typography;

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  // const router = useRouter();

  const handleSubmit = async (values: { Username: string; Password: string }) => {
    const { Username, Password } = values;

    try {
      const response = await deafCareAPI.login({ Username, Password });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        redirect("/user-screen");
      } else {
        setError(response.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          {/* <Image
            src={TeleDeafIcon}
            alt="TeleDeaf Logo"
            style={{ width: 100, height: 100, marginBottom: 16 }}
          /> */}
          <Title level={3}>Login Screen</Title>
          <Text type="secondary">Welcome!</Text>
        </div>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ username: "", password: "" }}
        >
          <Form.Item
            label="Username"
            name="Username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input
              placeholder="Enter your User Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Enter your Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Text type="secondary">Forgot Password? </Text>
          <Button type="link" onClick={() => {
              return redirect("/ForgotPassword");
            }}>
            Reset Here
          </Button>
        </div>

        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Text>Don’t have an account? </Text>
          <Button type="link" onClick={() => {
              return redirect("/CreateUserScreen");
            }}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export const loginPageRouter = {
  path: "login-screen",
  element: (
      <LoginPage></LoginPage>
  ),
};
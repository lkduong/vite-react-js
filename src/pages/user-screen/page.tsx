"use client";

import { useState, useEffect } from "react";
import { Button, Typography, List, Avatar, Badge, Tooltip } from "antd";
import { VideoCameraOutlined, MessageOutlined } from "@ant-design/icons";
import { Link, redirect } from "react-router-dom";
import { deafCareAPI } from "../../services/deafcare-api";

const { Title, Text } = Typography;

interface IContactListItem {
  name: string; 
  status: string; 
}

export default function UserScreen() {

  const handleCameraClick = (callerName: string) => {
    redirect(`/callComing-screen?callerName=${callerName}`);
  };

  const handleMessageClick = (messagerName: string) => {
    redirect(`/chat-screen?messagerName=${messagerName}`);
  };

  const [contacts, setContacts] = useState<IContactListItem[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserName(parsedUser.FullName || ""); 
        }

        const result = await deafCareAPI.getUsers(); 

        if (result.data) {
          let mappedContacts = result.data.map((user: any) => ({
            name: user.user_info.full_name, 
            status: user.status
          }));
          setContacts(mappedContacts);
        } else {
          console.error("Failed to fetch contacts:", result.message);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []); 
  const messages = [
    { name: "Miracle Herwitz", unread: true, status: "offline" },
    { name: "Kianna Calzoni", unread: false, status: "online" },
    { name: "Miracle Herwitz", unread: true, status: "offline" },
    { name: "Kianna Calzoni", unread: false, status: "online" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "16px",
      }}
    >
      {/* Main Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          padding: "24px",
          border: "2px solid #1890ff",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Title level={3}>Home Screen</Title>
        </div>

        <div
          style={{
            backgroundColor: "#CCFFFF",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            marginBottom: "24px",
            marginLeft: "-24px",
            marginRight: "-24px",
            width: "calc(100% + 48px)",
          }}
        >
          <Text style={{ fontSize: "16px", fontWeight: "bold" }}>Hi, {userName}!</Text>
          <Badge>
            <Avatar
              style={{
                backgroundColor: "#87CEEB",
                color: "white",
                fontSize: "16px",
                position: "relative",
              }}
            >
              {userName.charAt(0)}
            </Avatar>
            <Tooltip>
              <div
                style={{
                  position: "absolute",
                  bottom: 5,
                  right: 0,
                  backgroundColor: "green",
                  borderRadius: "50%",
                  width: "10px",
                  height: "10px",
                  border: "2px solid white",
                }}
              />
            </Tooltip>
          </Badge>
        </div>
        {/* Contacts Section */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Title level={4}>Contacts</Title>
            <Link to="/contacts">
              <Text style={{ color: "#1890ff" }}>See all</Text>
            </Link>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={contacts}
            renderItem={(contact) => (
              <List.Item
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  overflow: "hidden",
                }}
                actions={[
                  <Button
                    style={{
                      color: "white",
                      borderRadius: "50%",
                    }}
                    icon={
                      <VideoCameraOutlined
                        style={{
                          backgroundColor: "#1E90FF",
                          color: "white",
                          borderRadius: "50%",
                          padding: "6px",
                        }}
                      />
                    }
                    onClick={() => handleCameraClick(contact.name)}
                  />,
                ]}
              >
                <List.Item.Meta
                  style={{
                    marginLeft: "10px",
                  }}
                  avatar={
                    <Badge
                      color={contact.status === "online" ? "green" : "gray"}
                      offset={[8, 0]}
                    >
                      <Avatar
                        style={{
                          position: "relative",
                          backgroundColor: "#87CEEB",
                        }}
                      >
                        {contact.name.charAt(0)}
                      </Avatar>
                      <Tooltip
                        title={
                          contact.status === "online" ? "Online" : "Offline"
                        }
                      >
                        <div
                          style={{
                            position: "absolute",
                            bottom: 5,
                            right: 0,
                            backgroundColor:
                              contact.status === "online" ? "green" : "gray",
                            borderRadius: "50%",
                            width: "10px",
                            height: "10px",
                            border: "2px solid white",
                          }}
                        />
                      </Tooltip>
                    </Badge>
                  }
                  title={contact.name}
                />
              </List.Item>
            )}
          />
        </div>

        {/* Messages Section */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <Title level={4}>Messages</Title>
            <Link to="/messages">
              <Text style={{ color: "#1890ff" }}>See all</Text>
            </Link>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={messages}
            renderItem={(message) => (
              <List.Item
                style={{
                  border: "1px solid black",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  overflow: "hidden",
                }}
                actions={[
                  <div style={{ position: "relative" }}>
                    <Button
                      style={{
                        color: "white",
                        borderRadius: "50%",
                      }}
                      icon={
                        <MessageOutlined
                          style={{
                            backgroundColor: "#1E90FF",
                            color: "white",
                            borderRadius: "50%",
                            padding: "6px",
                          }}
                        />
                      }
                       onClick={() => handleMessageClick(message.name)}
                    />
                    {message.unread && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          width: "10px",
                          height: "10px",
                          backgroundColor: "red",
                          borderRadius: "50%",
                          border: "2px solid white",
                        }}
                      />
                    )}
                  </div>,
                ]}
              >
                <List.Item.Meta
                  style={{
                    marginLeft: "10px",
                  }}
                  avatar={
                    <Badge
                      color={message.unread ? "red" : "gray"}
                      offset={[8, 0]}
                    >
                      <Avatar
                        style={{
                          position: "relative",
                          backgroundColor: "#87CEEB",
                        }}
                      >
                        {message.name.charAt(0)}
                      </Avatar>
                      <Tooltip title={message.unread ? true : false}>
                        <div
                          style={{
                            position: "absolute",
                            bottom: 5,
                            right: 0,
                            backgroundColor:
                              message.status === "online" ? "green" : "gray",
                            borderRadius: "50%",
                            width: "10px",
                            height: "10px",
                            border: "2px solid white",
                          }}
                        />
                      </Tooltip>
                    </Badge>
                  }
                  title={message.name}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

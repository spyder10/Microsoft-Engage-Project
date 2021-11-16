import { useEffect } from "react";

import { useChat } from "../context/ChatContext";
import { getChats, ChatEngine } from "react-chat-engine";
import useAuth from "../hooks/useAuth";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Chat() {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    setSelectedChat,
  } = useChat();

  console.log(chatConfig);

  const authUser = useAuth();
  return (
    <>
      <Navbar style={{ backgroundColor: "#99A799" }}>
        {" "}
        {chatConfig && chatConfig.role === "student" && (
          <Link to="/scheduler">Scheduler</Link>
        )}
        {chatConfig && chatConfig.role === "teacher" && (
          <Link to="/scheduler_teacher">SchedulerTeacher</Link>
        )}
      </Navbar>
      {!!chatConfig && (
        <ChatEngine
          height="100vh"
          width="100vw"
          userName={chatConfig.userName}
          projectID={chatConfig.projectID}
          userSecret={chatConfig.userSecret}
          onConnect={() => {
            getChats(chatConfig, setMyChats);
          }}
          onNewChat={(chat) => {
            if (chat.admin.username === chatConfig.userName) {
              selectChatClick(chat);
            }
            setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
          }}
          onDeleteChat={(chat) => {
            if (selectedChat?.id === chat.id) {
              setSelectedChat(null);
            }
            setMyChats(
              myChats
                .filter((c) => c.id !== chat.id)
                .sort((a, b) => a.id - b.id)
            );
          }}
        />
      )}
    </>
  );
}

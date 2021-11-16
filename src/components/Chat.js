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
  const authUser = useAuth();

  // useEffect(() => {
  //   window.location.reload();
  // }, [authUser]);
  return (
    <>
      <Navbar style={{ backgroundColor: "#99A799" }}>
        {" "}
        <Link to="/scheduler">Scheduler</Link>
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

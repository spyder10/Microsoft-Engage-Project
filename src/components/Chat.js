import { useChat } from "../context/ChatContext";
import { getChats, ChatEngine } from "react-chat-engine";
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { fb } from "../service/firebase";

export default function Chat() {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    setSelectedChat,
  } = useChat();

  const logOutHandler = () => {
    fb.auth.signOut();
    window.location.reload();
  };

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <h1 className="text-danger">Scheduler</h1>
          </Navbar.Brand>
          <Nav className="me-auto mx-4">
            {chatConfig && chatConfig.role === "student" && (
              <h3>
                <Badge bg="secondary">
                  <Link to="/scheduler" className="text-decoration-none">
                    Student's Desk
                  </Link>
                </Badge>
              </h3>
            )}
            {chatConfig && chatConfig.role === "teacher" && (
              <h3>
                <Badge bg="secondary">
                  <Link
                    to="/scheduler_teacher"
                    className="text-decoration-none"
                  >
                    Teacher's Desk{" "}
                  </Link>
                </Badge>
              </h3>
            )}
          </Nav>
          <Nav>
            <Avatar
              className="mx-2"
              sx={{ height: "70px", width: "70px" }}
            ></Avatar>
            <Navbar.Brand className="avatar text-light">
              {chatConfig
                ? chatConfig.userName?.charAt(0).toUpperCase() +
                  chatConfig.userName?.slice(1)
                : " "}
            </Navbar.Brand>{" "}
            <Button
              className="btn-outline-dark text-light"
              variant="secondary"
              onClick={logOutHandler}
            >
              Log Out
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {!!chatConfig &&
        chatConfig.userName &&
        chatConfig.projectID &&
        chatConfig.userSecret && (
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

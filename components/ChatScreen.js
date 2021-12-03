import styled from "styled-components";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useRouter } from "next/dist/client/router";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import AttachmentRoundedIcon from "@material-ui/icons/AttachmentRounded";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import InsertEmoticonRoundedIcon from "@material-ui/icons/InsertEmoticonRounded";
import Message from "./Message";
import MicRoundedIcon from "@material-ui/icons/MicRounded";
//? const Eom = EndOfMessage

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    }
  };

  return (
    <Container>
      <Header>
        <Avatar
          style={{
            boxShadow: "3px 3px 20px grey",
          }}
        />

        <HeaderInfo>
          <h5>{getRecipientEmail(chat.users, user)}</h5>
          <p>Last seen ...</p>
        </HeaderInfo>
        <HeaderIcons>
          <IconButton
            style={{
              marginRight: "7px",
              boxShadow: "3px 3px 20px grey",
            }}
          >
            <SearchRoundedIcon />
          </IconButton>
          <IconButton
            style={{
              boxShadow: "3px 3px 20px grey",
            }}
          >
            <MoreVertRoundedIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
        {showMessages()}
        <Eom />
      </MessageContainer>

      <InputContainer>
        <IconButton
          style={{
            marginRight: "7px",
            boxShadow: "3px 3px 20px grey",
          }}
        >
          <InsertEmoticonRoundedIcon />
        </IconButton>
        <IconButton
          style={{
            marginRight: "7px",
            boxShadow: "3px 3px 20px grey",
          }}
        >
          <AttachmentRoundedIcon
            style={{
              transform: "rotate(325deg)",
            }}
          />
        </IconButton>
        <Input placeholder="Type a message" />
        <IconButton
          style={{
            marginLeft: "7px",
            boxShadow: "3px 3px 20px grey",
          }}
        >
          <MicRoundedIcon />
        </IconButton>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
  margin-left: 15px;
  flex: 1;

  > h5 {
    margin-bottom: 3px;
    font-size: 16px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
  padding: 30px;
  min-height: 90vh;
  background-image: url("http://s1.picswalls.com/wallpapers/2016/06/10/4k-images_065230592_309.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Eom = styled.div``;

const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 13px;
  position: sticky;
  bottom: 0;
  background-color: white;
  border: none;
  outline-width: 0;
  border-radius: 100px;
  box-shadow: 3px 3px 20px grey;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 5px;
  position: sticky;
  background-color: #f0f0f0;
  bottom: 0;
  z-index: 100;
`;

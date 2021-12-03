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
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { useState } from "react";
import firebase from "firebase";
import TimeAgo from "timeago-react";
//? const Eom = EndOfMessage

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");
  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
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
    } else {
      return JSON.parse(messages).map((message) => {
        <Message key={message.id} user-={message.user} message={message} />;
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });

    setInput("");
  };

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientEmail = getRecipientEmail(chat.users, user);

  return (
    <Container>
      <Header>
        {recipient ? (
          <Avatar
            src={recipient?.photoURL}
            style={{
              boxShadow: "3px 3px 20px grey",
            }}
          />
        ) : (
          <Avatar
            style={{
              boxShadow: "3px 3px 20px grey",
            }}
          >
            {recipientEmail[0]}
          </Avatar>
        )}

        <HeaderInfo>
          <h5>{recipientEmail}</h5>
          {recipientSnapshot ? (
            <p>
              Last active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datatime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          ) : (
            <p>Loading Last active...</p>
          )}
        </HeaderInfo>
        <HeaderIcons>
          <IconButton
            style={{
              marginRight: "7px",
              boxShadow: "1px 3px 10px grey",
            }}
          >
            <SearchRoundedIcon />
          </IconButton>
          <IconButton
            style={{
              boxShadow: "1px 3px 10px grey",
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
            boxShadow: "1px 3px 10px grey",
          }}
        >
          <InsertEmoticonRoundedIcon />
        </IconButton>
        <IconButton
          style={{
            marginRight: "7px",
            boxShadow: "1px 3px 10px grey",
          }}
        >
          <AttachmentRoundedIcon
            style={{
              transform: "rotate(325deg)",
            }}
          />
        </IconButton>
        <Input
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {input ? (
          <IconButton
            style={{
              marginLeft: "7px",
              boxShadow: "1px 3px 10px grey",
            }}
            disabled={!input}
            type="submit"
            onClick={sendMessage}
          >
            <SendRoundedIcon />
          </IconButton>
        ) : (
          <IconButton
            style={{
              marginLeft: "7px",
              boxShadow: "1px 3px 10px grey",
            }}
          >
            <MicRoundedIcon />
          </IconButton>
        )}
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
  background-color: white;
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
  box-shadow: 3px 3px 20px #969696;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 5px;
  position: sticky;
  background-color: white;
  bottom: 0;
  z-index: 100;
`;

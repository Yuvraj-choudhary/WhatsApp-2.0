import styled from "styled-components";
import { Avatar, Button, IconButton } from "@material-ui/core";
import ChatRoundedIcon from "@material-ui/icons/ChatRounded";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DonutLargeRoundedIcon from "@material-ui/icons/DonutLargeRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an Email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  const signOut = () => {
    auth.signOut();
  };

  return (
    <SidebarApp>
      <SidebarContainer>
        <Header>
          <UserAvatar src={user.photoURL} onClick={signOut} />
          <IconContainer>
            <IconButton>
              <DonutLargeRoundedIcon />
            </IconButton>
            <IconButton onClick={createChat}>
              <ChatRoundedIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </IconContainer>
        </Header>
        <Search>
          <SearchContainer>
            <SearchIcon />
            <SearchInput placeholder="Search in chats" />
          </SearchContainer>
        </Search>
        {chatSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </SidebarContainer>
    </SidebarApp>
  );
}

export default Sidebar;

const SidebarApp = styled.div``;
const SidebarContainer = styled.div``;
const SearchIcon = styled(SearchRoundedIcon)`
  color: #707070;
  margin-left: 10px;
`;
const SearchInput = styled.input`
  border: none;
  outline-width: 0;
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  margin: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.75;
  }
`;
const IconContainer = styled.div``;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 35px;
  border-radius: 25px;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  height: 50px;
  padding: 10px;
`;

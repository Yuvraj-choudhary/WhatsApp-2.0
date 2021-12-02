import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";

function Chat() {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context){
  
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: auto;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

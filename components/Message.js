import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import moment from "moment";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
  const TypeOfTimestamp =
    user === userLoggedIn.email ? TimestampSender : TimestampReceiver;

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <TypeOfTimestamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : ".."}
        </TypeOfTimestamp>
      </TypeOfMessage>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.div`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  height: auto;
  margin: 10px;
  min-width: 60px;
  max-width: 100%;
  padding-bottom: 26px;
  position: relative;
  text-align: center;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: 3px 3px 20px grey;
`;

const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #3777f0;
  border-top-right-radius: 0;
  color: white;
`;

const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
  border-top-left-radius: 0;
`;

const TimestampReceiver = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px !important;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;

const TimestampSender = styled(TimestampReceiver)`
  color: white;
`;

import React from "react";
import { useQuery, useSubscription } from "react-apollo-hooks";
import { GET_MESSAGES, MESSAGE_SUBSCRIPTION } from "./Queries";
import styled from "styled-components";

const Chats = ({ innerChannelId }) => {
  const { data } = useQuery(GET_MESSAGES, {
    variables: { innerChannelId }
  });

  useSubscription(MESSAGE_SUBSCRIPTION, {
    onSubscriptionData: ({
      client,
      subscriptionData: { data: { CreateMessageSubscription } }
    }) => {
      try {
        let messages = client.readQuery({
          query: GET_MESSAGES,
          variables: { innerChannelId }
        }).GetMessages.messages;

        if (CreateMessageSubscription.innerChannelId === innerChannelId) {
          messages.push(CreateMessageSubscription);

          client.writeQuery({
            query: GET_MESSAGES,
            variables: { innerChannelId },
            data: {
              messages
            }
          });
        }
      } catch (e) {}
    }
  });

  const TimeConverter = timestamp => {
    if (!timestamp) {
      return;
    }
    let timestamp_date = new Date(parseInt(timestamp));
    return timestamp_date.toLocaleString();
  };

  return (
    <div>
      {data.GetMessages &&
        data.GetMessages.messages.length === 0 &&
        <ChatRow>채팅 내역이 없습니다.</ChatRow>}
      {data.GetMessages &&
        data.GetMessages.ok &&
        data.GetMessages.messages.map((message, index) =>
          <ChatRow key={index}>
            <Thumbnail src="http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcRi0w9xFJKbc0E9YlGvc5BKKjBQmzmgEIlyXDN23XASYe1KsLHEqRvOAIUT6VmtnZEoglAlX0mQlPMK8PxTNOo" />
            <MessageFrame>
              <ProfileFrame>
                <Nickname>
                  {message.nickname}
                </Nickname>
                <DateTime>
                  {TimeConverter(message.createdAt)}
                </DateTime>
              </ProfileFrame>
              <Message>
                {message.contents}
              </Message>
            </MessageFrame>
          </ChatRow>
        )}
    </div>
  );
};

const ChatRow = styled.div`
  display: flex;
  align-items: center;
  height: 56px;
  padding-left: 15px;

  &:hover {
    background: #ececec;
  }
`;

const Thumbnail = styled.img`
  margin-right: 10px;
  height: 40px;
`;

const MessageFrame = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const DateTime = styled.div`
  font-size: 12px;
  padding-top: 3px;
  padding-left: 5px;
`;
const ProfileFrame = styled.div`
  display: flex;
  flex-direction: row;
`;
const Message = styled.a`
  font-size: 14px;
  margin-top: 2px;
`;

export default Chats;

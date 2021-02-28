import React, { useState, useContext } from "react";
import { Store } from "../GlobalState/store";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import {
  CHANNELS_QUERY,
  CREATE_CHANNEL,
  CHANNELS_SUBSCRIPTION,
  DELETE_CHANNEL,
} from "./Queries";
import styled, { css } from "styled-components";

const LeftPannel = () => {
  const { state, dispatch } = useContext(Store);
  const { data, loading } = useQuery(CHANNELS_QUERY);
  const [createChannelName, setCreateChannelName] = useState("");

  const switchChannel = id => {
    dispatch({
      type: "SET_VALUE",
      target: "selectedChannelId",
      payload: id
    });
  };

  useSubscription(CHANNELS_SUBSCRIPTION, {
    onSubscriptionData: ({
      client,
      subscriptionData: {
        data: { CreateChannelSubscription }
      }
    }) => {
      try {
        let channels = client.readQuery({ query: CHANNELS_QUERY }).GetChannels
          .Channels;
        
        console.log(channels, CreateChannelSubscription)
        channels.push(CreateChannelSubscription);
        // channels.push(DeleteChannelSubscription);

        client.writeQuery({
          query: CHANNELS_QUERY,
          data: {
            channels
          }
        });
      } catch (e) {}
    }
  });
  
  

  const createChannel = useMutation(CREATE_CHANNEL, {
    variables: {
      channelName: createChannelName
    },
    update: (proxy, mutationResult) => {
      setCreateChannelName("");
    }
  });

  const deleteChannel =useMutation(DELETE_CHANNEL, {
    variables:{
      id: state.selectedChannelId
    }
  })

  const onAddChannel = e => {
    if (e.key === "Enter") {
        createChannel(); 
    }
  };
  return (
    <>
      <LeftMenuFrame>
        <Title>Slack-Apollo-hooks</Title>
        <SubTitle>Channel</SubTitle>
        {loading && <Channel>loading...</Channel>}
        {data.GetChannels &&
          data.GetChannels.ok &&
          data.GetChannels.Channels.map((channel, index) => (
          <ChannelFrame key={index}>
            <Channel
              key={index}
              isActive={channel.id === state.selectedChannelId}
              onClick={() => switchChannel(channel.id)}
            >
              # {channel.channelName}
            </Channel>
            {channel.id === state.selectedChannelId &&
              <DeleteChannelBtn onClick={deleteChannel}>x</DeleteChannelBtn>
            }
          </ChannelFrame>
          ))}
        <CreateChannelFrame>
          <CreateChannelInput
            placeholder="Create Channel"
            value={createChannelName}
            onChange={e => setCreateChannelName(e.target.value)}
            onKeyPress={e => onAddChannel(e)}
          />
          <CreateChannelBtn onClick={createChannel}>+</CreateChannelBtn>
        </CreateChannelFrame>
      </LeftMenuFrame>
    </>
  );
};

const LeftMenuFrame = styled.div`
  position: relative;
  padding: 15px 15px 15px 15px;
  width: 250px;
  height: 100%;
  background: #4d394b;
`;

const Title = styled.div`
  width: 100%;
  height: 40px;
  font-weight: bold;
  color: white;
  font-size: 20px;
`;

const SubTitle = styled.div`
  width: 100%;
  height: 40px;
  color: #dcdcdc;
  font-size: 15px;
`;

const Channel = styled.div`
  width: 90%;
  height: 30px;
  color: #8e8d8d;
  font-size: 15px;
  cursor: pointer;
  ${props =>
    props.isActive &&
    css`
      color: white;
      font-weight: bold;
      cursor: context-menu;
    `}
`;

const CreateChannelFrame = styled.div`
  display: flex;
  position: absolute;
  width: 85%;
  height: 35px;
  bottom: 10px;
`;

const CreateChannelInput = styled.input`
  flex: 1;
  height: 100%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border: 1px solid #dcdcdc;
  padding-left: 15px;
`;
const CreateChannelBtn = styled.button`
  width: 17%;
  height: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background: #a9a7a7;
  }
`;

const ChannelFrame = styled.div`
  display: flex;
`

const DeleteChannelBtn = styled.div`
  width: 10%;
  height: 30px;
  cursor: pointer;
  color: #8e8d8d;
  background: #4d394b;
`

export default LeftPannel;

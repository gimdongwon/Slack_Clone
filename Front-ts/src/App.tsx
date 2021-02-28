import React from "react";
import "./App.css";
import styled from "styled-components";
import ChatList from "./Components/ChatList";
import ChannelList from "./Components/ChannelList";

const App: React.FC = () => {
  return (
    <MainFrame>
      <ChannelList />
      <ChatList />
    </MainFrame>
  );
};

const MainFrame = styled.div`
  display: flex;
  height: 100%;
  flex: row;
`;

export default App;

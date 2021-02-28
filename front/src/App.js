import React from "react";
import styled from "styled-components";

import LeftPannel from "./Components/LeftPannel";
import RightPannel from "./Components/RightPannel";

import Favicon from "react-favicon";
import Helmet from "react-helmet";

const MainFrame = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
`;
const App = () => {
  return (
    <MainFrame>
      <Favicon url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjcK2jCmVypVuNqGYkmHLoWmqJHb6MTbIFqQ&usqp=CAU" />
      <Helmet>
        <title>Slack with apollo & hooks - gimdongwon</title>
      </Helmet>
      <LeftPannel />
      <RightPannel />
    </MainFrame>
  );
};

export default App;

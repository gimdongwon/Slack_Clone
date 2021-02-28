import gql from "graphql-tag";

export const CREATE_CHANNEL = gql`
  mutation createChannel($channelName: String!) {
    CreateChannel(channelName: $channelName) {
      ok
      error
    }
  }
`;

export const CHANNELS_SUBSCRIPTION = gql`
  subscription CreateChannelSubscription {
    CreateChannelSubscription {
      id
      channelName
    }
  }
`;

export const DELETE_CHANNEL = gql`
  mutation deleteChannel($id: Int!) {
    DeleteChannel(id: $id) {
      ok
      error
    }
  }
`;

export const CHANNELS_QUERY = gql`
  query {
    GetChannels {
      ok
      Channels {
        id
        channelName
      }
    }
  }
`;

// 메시지 관련

export const GET_MESSAGES = gql`
  query getMessage($innerChannelId: Int!) {
    GetMessages(innerChannelId: $innerChannelId) {
      ok
      error
      messages {
        id
        nickname
        contents
        createdAt
        thumbnail
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage(
    $nickname: String!
    $contents: String!
    $innerChannelId: Int!
    $thumbnail: String!
  ) {
    SendMessage(
      nickname: $nickname
      contents: $contents
      innerChannelId: $innerChannelId
      thumbnail: $thumbnail
    ) {
      ok
      error
    }
  }
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription CreateMessageSubscription {
    CreateMessageSubscription {
      nickname
      contents
      createdAt
      innerChannelId
    }
  }
`;

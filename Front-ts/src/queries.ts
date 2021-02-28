import gql from "graphql-tag";

export const CREATE_CHANNEL = gql`
  mutation createChannel($channelName: String!) {
    CreateChannel(channelName: $channelName) {
      ok
      error
    }
  }
`;

export const CHANNELS_QUERY = gql`
  query {
    GetChannel {
      ok
      channels {
        id
        channelName
      }
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

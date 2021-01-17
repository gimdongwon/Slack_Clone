import gql from "graphql-tag";

export const GET_CHANNELS_QUERY = gql`
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

export const CREATE_CHANNEL_MUTATION = gql`
  mutation createChannel($channelName: String!) {
    CreateChannel(channelName: $channelName) {
      ok
      error
    }
  }
`;

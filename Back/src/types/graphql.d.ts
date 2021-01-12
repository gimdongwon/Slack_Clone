export const typeDefs = ["type CreateChannelResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CreateChannel(channelName: String!): CreateChannelResponse!\n}\n\ntype Channel {\n  id: Int!\n  channelName: String!\n  messages: [Message]\n  createdAt: String!\n  updatedAt: String\n}\n\ntype GetMessagesResponse {\n  ok: Boolean!\n  error: String\n  messages: [Message]\n}\n\ntype Query {\n  GetMessages(innerChannelId: Int!): GetMessagesResponse!\n}\n\ntype Message {\n  id: Int!\n  nickname: String!\n  contents: String!\n  innerChannel: Channel!\n  innerChannelId: Int!\n  createdAt: String!\n  updatedAt: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetMessages: GetMessagesResponse;
}

export interface GetMessagesQueryArgs {
  innerChannelId: number;
}

export interface GetMessagesResponse {
  ok: boolean;
  error: string | null;
  messages: Array<Message> | null;
}

export interface Message {
  id: number;
  nickname: string;
  contents: string;
  innerChannel: Channel;
  innerChannelId: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface Channel {
  id: number;
  channelName: string;
  messages: Array<Message> | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface Mutation {
  CreateChannel: CreateChannelResponse;
}

export interface CreateChannelMutationArgs {
  channelName: string;
}

export interface CreateChannelResponse {
  ok: boolean;
  error: string | null;
}

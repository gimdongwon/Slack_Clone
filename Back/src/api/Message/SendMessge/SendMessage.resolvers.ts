import {
  SendMessageMutationArgs,
  SendMessageResponse
} from "./../../../types/graphql.d";
import { Resolvers } from "src/types/resolvers";
import Message from "../../../../src/entities/Message";
import Channel from "../../../../src/entities/Channel";

const resolvers: Resolvers = {
  Mutation: {
    SendMessage: async (
      _,
      args: SendMessageMutationArgs
    ): Promise<SendMessageResponse> => {
      try {
        const { nickname, contents, innerChannelId, thumbnail } = args;

        const channel = await Channel.findOne({ id: innerChannelId });

        if (!channel) {
          return {
            ok: false,
            error: "is not exist Channel",
            result: "채널이 존재하지 않습니다."
          };
        }
        await Message.create({
          nickname,
          contents,
          innerChannelId,
          thumbnail
        }).save();

        return {
          ok: true,
          error: "success",
          result: "메시지 전송에 성공하였습니다."
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          result: "메시지 전송에 실패하였습니다."
        };
      }
    }
  }
};

export default resolvers;

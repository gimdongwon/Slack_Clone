import {
  ModifyChannelResponse,
  ModifyChannelMutationArgs
} from "./../../../types/graphql.d";
import { Resolvers } from "../../../types/resolvers";
import Channel from "../../../entities/Channel";

const resolvers: Resolvers = {
  Mutation: {
    ModifyChannel: async (
      _,
      args: ModifyChannelMutationArgs
    ): Promise<ModifyChannelResponse> => {
      try {
        const { id, nextName } = args;
        const existChannel = await Channel.findOne({ id });

        if (!existChannel) {
          return {
            ok: false,
            error: "존재하지 않는 채널입니다.",
            changedName: null
          };
        }
        existChannel.channelName = nextName;
        existChannel.save();

        const reExistChannel = await Channel.findOne({ id });
        if (!reExistChannel) {
          return {
            ok: false,
            error: null,
            changedName: null
          };
        }
        return {
          ok: true,
          error: "변경되었습니다.",
          changedName: nextName
        };
      } catch (error) {
        return { ok: false, error: error.Message, changedName: null };
      }
    }
  }
};

export default resolvers;

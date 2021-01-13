import { DeleteChannelResponse } from "./../../../types/graphql.d";
import { Resolvers } from "./../../../types/resolvers";
import Channel from "../../../entities/Channel";

const resolvers: Resolvers = {
  Mutation: {
    DeleteChannel: async (_, args): Promise<DeleteChannelResponse> => {
      try {
        const { id } = args;

        const targetChannel = await Channel.findOne({ id });
        if (!targetChannel) {
          return {
            ok: false,
            error: "이미 삭제되었습니다."
          };
        }
        targetChannel.remove();
        return {
          ok: false,
          error: "삭제가 완료되었습니다."
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }
  }
};

export default resolvers;

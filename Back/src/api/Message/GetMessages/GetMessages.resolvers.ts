import {
  GetMessagesQueryArgs,
  GetMessagesResponse
} from "./../../../types/graphql";
import { Resolvers } from "src/types/resolvers";

// 상대경로로 사용해야함 (절대경로로는 파일을 못찾음)
import Message from "../../../../src/entities/Message";

// 아래 쿼리 구조는 graphQL에서 정해놓은 규격
const resolvers: Resolvers = {
  Query: {
    GetMessages: async (
      _,
      args: GetMessagesQueryArgs
    ): Promise<GetMessagesResponse> => {
      // GetMessages 라는 동작에 대한 비즈니스 로직 (Spring의 Controller와 유사)
      // 사용자가 API를 호출했을때 인자값이 args 안으로 들어온다.

      try {
        const { innerChannelId } = args;
        // = const innerChannelId = args.innerChannerId;
        // Message (typeORM) 을 사용하여 쿼리 메소드를 실행할 수 있음
        // innerChannelId와 일치하는 데이터를 조회해달라는 의미

        const messages = await Message.find({ innerChannelId });
        // await : 동기적으로 실행되고있으므로 데이터를 가져올때까지 기다려줘야해서 await 선언
        // {innerChannelId} =>(동일) innerChannelId = innerChannelId
        // 리스트 조회 =select * from Message where innerChannelId = 0

        return {
          ok: true, // 성공
          error: null, // 성공했으므로 error는 null
          messages // 위 쿼리메소드를 통해 조회해온 데이터를 담음
        };
      } catch (error) {
        return {
          ok: false, // 에러 발생
          error: error.message, // js에서 지원해줌
          messages: null // 에러가 발생하였으므로 messages는 비어있다
        };
      }
    }
  }
};

export default resolvers;

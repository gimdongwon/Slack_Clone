import { GraphQLServer } from "graphql-yoga";
// graphql-yoga 패키지를 GraphQLServer라는 이름으로 가져온다.

const typeDefs = `
    type Query {
        sayHello: String!
    }
`;
//  graphql server를 실행시키기 위해 필요한 파라미터중 하나 typeDefs 정의
//  'typeDefs'는 인자와 리턴되는 값의 타입을 지정한다.
//  추가적으로 String!의 !는 null 허용하지 않음을 의미함.

const resolvers = {
  Query: {
    sayHello: () => "Hi there!"
  }
};

// grqphql server를 실행시키기 위한 나머지 하나 파라미터 resolvers
// resolvers는 비즈니스 로직이 실제로 들어가는 부분이다.

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(() => console.log("GraphQL Server running on localhost:4000"));

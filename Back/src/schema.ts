import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import { makeExecutableSchema } from "graphql-tools";
import path from "path";

// type 관련 파일 load
const allTypes: any = fileLoader(path.join(__dirname, "./api/**/*.graphql"));

// resolver 관련 파일 load
const allResolvers: any = fileLoader(
  path.join(__dirname, "./api/**/*.resolvers.*")
);

// 불러온 type과 resolver들을 병합
const mergedTypes = mergeTypes(allTypes);
const mergedResolvers: any = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;

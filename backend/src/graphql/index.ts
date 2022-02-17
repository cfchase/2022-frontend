import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const resolversArray = loadFilesSync(`${__dirname}/modules/**/resolvers.*`);
export const resolvers = mergeResolvers(resolversArray);

const typesArray = loadFilesSync(`${__dirname}/modules/**/*.gql`);
export const typeDefs = mergeTypeDefs(typesArray);

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

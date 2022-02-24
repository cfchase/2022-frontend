import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import resolvers from './resolvers';

const gameModule = createModule({
  id: 'game',
  dirname: __dirname,
  typeDefs: loadFilesSync(`${__dirname}/types.gql`),
  resolvers,
});

export default gameModule;

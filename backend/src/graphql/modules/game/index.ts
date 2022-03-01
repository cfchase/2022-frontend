import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { GameProvider } from './provider';
import resolvers from './resolvers';

const gameModule = createModule({
  id: 'game',
  providers: [GameProvider],
  typeDefs: loadFilesSync(`${__dirname}/types.gql`),
  resolvers,
});

export default gameModule;

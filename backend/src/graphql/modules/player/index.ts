import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { PlayerService } from './service';
import resolvers from './resolvers';

const graphqlModule = createModule({
  id: 'player',
  providers: [PlayerService],
  typeDefs: loadFilesSync(`${__dirname}/types.gql`),
  resolvers,
});

export default graphqlModule;

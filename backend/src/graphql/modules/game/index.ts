import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { GameService } from './service';
import resolvers from './resolvers';

const graphqlModule = createModule({
  id: 'game',
  dirname: __dirname,
  providers: [GameService],
  typeDefs: loadFilesSync(`${__dirname}/types.gql`),
  resolvers,
});

export default graphqlModule;

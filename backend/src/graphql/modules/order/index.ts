import { loadFilesSync } from '@graphql-tools/load-files';
import { createModule } from 'graphql-modules';
import { OrderService } from './service';
import resolvers from './resolvers';

const graphqlModule = createModule({
  id: 'order',
  providers: [OrderService],
  typeDefs: loadFilesSync(`${__dirname}/types.gql`),
  resolvers,
});

export default graphqlModule;

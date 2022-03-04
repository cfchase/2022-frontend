import { createApplication } from 'graphql-modules';
import gameModule from './modules/game';
import { PubSub } from './PubSub';

export const application = createApplication({
  modules: [gameModule],
  providers: [PubSub],
});

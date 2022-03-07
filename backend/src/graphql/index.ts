import { createApplication } from 'graphql-modules';
import gameModule from './modules/game';
import playerModule from './modules/player';
import { PubSub } from './PubSub';

export const application = createApplication({
  modules: [gameModule, playerModule],
  providers: [PubSub],
});

import { createApplication } from 'graphql-modules';
import gameModule from './modules/game';
import orderModule from './modules/order';
import playerModule from './modules/player';
import { PubSub } from './PubSub';

export const application = createApplication({
  modules: [gameModule, orderModule, playerModule],
  providers: [PubSub],
});

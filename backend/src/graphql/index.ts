import { createApplication } from 'graphql-modules';
import gameModule from './modules/game';

export const application = createApplication({
  modules: [gameModule],
});

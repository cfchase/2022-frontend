import base from './outgoing.base';

export = base('configuration', {
  player: require('./outgoing.partial.player'),
  game: require('./outgoing.partial.game'),
});

import "urlpattern-polyfill";

import { installRouter } from "pwa-helpers/router";

import { makeVar } from "@apollo/client/core";

const adminPattern = new URLPattern({ pathname: "/admin*" });
const adminGamesPattern = new URLPattern({ pathname: "/admin/games/:gameId" });

const getLocation = (loc = window.location) => ({
  ...window.location,
  admin: adminPattern.test(window.location),
  games: adminGamesPattern.exec(window.location)?.pathname?.groups
});

export const locationVar = makeVar(getLocation());

installRouter(loc => locationVar(getLocation(loc)));
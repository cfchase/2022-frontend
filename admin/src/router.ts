import "urlpattern-polyfill";

import { installRouter } from "pwa-helpers/router";

import { makeVar } from "@apollo/client/core";

const pattern = new URLPattern({ pathname: "/games/:gameId" });

const getLocation = (loc = window.location) => ({
  ...window.location,
  groups: pattern.exec(window.location)?.pathname?.groups
});

export const locationVar = makeVar(getLocation());

installRouter(loc => locationVar(getLocation(loc)));
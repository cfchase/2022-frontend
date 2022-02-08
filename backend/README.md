# WSS Backend for Summit 2022

## About

This repository provides a HTTP/WebSocket server on port 8080 by default.

The WebSocket endpoint is at the `/game` route.

General structure/design notes:

* Applications connect via WebSocket.
* JSON messages are passed back and forth by clients and server.
* Messages contain a `type` field used to identify a `handler` function on the backend.
* Messages are validated using `ajv`.
* Client must send a `connection` payload type to join the game.
* A lock is applied to each socket during message processing to prevent spam by a client. Messages sent by the client during that time are ignored.
* State is stored in key-value stores. Currently there's a `player` and `game` store.
* The player store will contain each player's username, UUID, score, etc.
* The game store contains a single entry. This contains the overall game state, e.g "active" or "paused". The server observes this and notifies all connected clients when it changes.
* Outgoing payloads are stringified using `fast-json-stringify` to improve performance. Outgoing payloads must be defined in the *jsonschema/* folder to serialise as expected.

## Development Mode

Start the backend in development mode with live reload on change:

```bash
npm install
npm run dev
```

Send a connection payload in another terminal:

```bash
node websockets/connection.js
```

The output will be similar to this. Note that the heartbeat arrives every few seconds:

```bash
$ node websockets/connection.js
Press CTRL-C to exit...

{"type":"configuration","sequence":1,"data":{"player":{},"game":{"cluster":"Local Dev","uuid":"pkjKedro-0vp4d7r-ESfL","date":"2022-02-08T02:22:32.847Z","state":"lobby"}}}
{"type":"heartbeat","sequence":2,"data":{}}
{"type":"heartbeat","sequence":3,"data":{}}
{"type":"heartbeat","sequence":4,"data":{}}
```

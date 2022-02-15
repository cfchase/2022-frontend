# Application Flow

## Application loading
For "in audience" users, the user will scan the QR code on the microcontroller. 
The QR code will take them to our web application where we will grab the UUID
of the microcontroller from the URL. We will store this in memory and in
`localStorage` in case of a browser refresh.

For "at home" users... (NEED TO WORK THIS OUT)

## Connection
When the application first loads in the browser, we establish a connection
to the web socket. When the `onopen` callback for the web socket fires,
we send a `CONNECTION` frame. 

### CONNECTION Frame
Before we send a `CONNECTION` frame to the web socket, we check to see if
the browser has a player and a game in `localStorage`. The backend will
check to see if the player already exists and that the current game that is
being played is equal to the `game.id` in `localStorage`.

The connection frame is in the following format if data is found in local
storage.
```
{
  type: "CONNECTION",
  data: {
    game: {
      id: string
    },
    player: {
      userid: string,
      username: string
    },
    microcontroller: {
      uuid: string
    }
  }
}
```

If there is no data found in `localStorage`, then we send a `CONNECTION`
frame that looks like this.
```
{
  type: "CONNECTION,
  data: {
    microcontroller: {
      uuid: string
    }
  }
}
```

## CONFIGURATION Frame
Upon the socket server receiving a `CONNECTION` frame from the client, the 
socket server will send back a `CONFIGURATION` frame that will contain 
information about the game and the player.
```
{
  type: "CONFIGURATION",
  player: {
    userid: string,
    username: string
  },
  game: {
    id: string,
    state: string
  },
  microcontroller: {
    uuid: string
  }
}
```

## Device pairing
Once we have the player established, we'll begin the pairing process with
the microcontroller. We'll send a `PAIRING` frame to the backend with
the UUID of the microcontroller and the player's userid.

```
{
  type: "PAIRING",
  data: {
    microcontroller: {
      uuid: string
    },
    player: {
      userid: string
    }
  }
}
```

Once the backend receives this message, the backend then sends a pairing
frame to the bluetooth gateway which relays the message to the microcontroller.
When the microcontroller receives the message, the LEDs on the microcontroller
start to blink indicating a completed pairing. The microcontroller then sends
a `PAIRING_COMPLETE` frame to the bluetooth gateway then to the backend and the
socket sends the `PAIRING_COMPLETE` frame to the mobile web application.

```
{
  type: "PAIRING_COMPLETE",
  microcontroller: {
    uuid: string
  }
}
```

At this moment, the microcontroller and the web application should be paired.

## GAME_STATE Frame
From the admin interface, a `GAME_STATE_CHANGE` frame is sent to the socket
server with a data object that looks like this.
```
{
  type: "GAME_STATE_CHANGE",
  state: string
}
```

The socket server receives the frame and sends a response `GAME_STATE` frame
to both the admin socket as well as the client socket.
```
{
  type: "GAME_STATE",
  game: {
    state: string
  }
}
```
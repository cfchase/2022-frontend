import { Server } from 'http';

/**
 * Extracts a friendly address string from a http.Server instance
 * @param server
 */
export function getWsAddressFromServer(server: Server): string {
  const addr = server.address();

  if (typeof addr === 'string') {
    return addr;
  } else {
    return `${addr?.address}:${addr?.port}`;
  }
}

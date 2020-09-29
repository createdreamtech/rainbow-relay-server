import { makeLogger } from "./lib/logging";
import { RainbowRelayServer } from "./lib/rainbowRelayServer";
export { getLogStream } from "./lib/logging";
const logger = makeLogger("Rainbow Relay Server", "Start Rainbow Relay Server");

export const startRainbowRelayServer = async (storage: Storage, port: string): Promise<RainbowRelayServer> => {
  const rainbowRelayServer = new RainbowRelayServer(`${port}`);
  logger.info(`Rainbow Relay Server port starting on ${port}`);
  await rainbowRelayServer.start();
  logger.info(`Rainbow Relay Server started on ${port}`);
  return rainbowRelayServer;
};
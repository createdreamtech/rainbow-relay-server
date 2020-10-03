import { makeLogger } from "./lib/logging";
import { RainbowRelayServer } from "./lib/rainbowRelayServer";
import { ServiceType } from "./lib/service";
export { getLogStream } from "./lib/logging";
const logger = makeLogger("Rainbow Relay Server", "Start Rainbow Relay Server");

export const startRainbowRelayServer = async (port: string, serviceType: ServiceType): Promise<RainbowRelayServer> => {
  const rainbowRelayServer = new RainbowRelayServer({port,serviceType});
  logger.info(`Rainbow Relay Server port starting on ${port}`);
  await rainbowRelayServer.start();
  logger.info(`Rainbow Relay Server started on ${port}`);
  return rainbowRelayServer;
};
import fs from "fs-extra";
import _ from "lodash";
import { makeLogger } from "../lib/logging";
import { Command } from "commander";
import { RainbowRelayServer } from "../lib/rainbowRelayServer";
const logger = makeLogger("RainbowService", "Commands");

interface ParsedCommands {
  port: string;
}

const parseCommands = async (prog: Command) => {
  let port = "7755";
  if (prog.port) { port = prog.port; }
  return { port };
};


/**
 * startRainbowRelayServer from CLI
 * @param program - are the commandline arguments
 */
export const startRainbowRelayServiceFromCLI = async (program: any): Promise<void> => {
  const commands = await parseCommands(program);
  const server = new RainbowRelayServer(commands.port)
  server.start() 
};
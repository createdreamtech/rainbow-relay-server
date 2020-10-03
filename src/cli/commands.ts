import fs from "fs-extra";
import _ from "lodash";
import { makeLogger } from "../lib/logging";
import { Command } from "commander";
import { RainbowRelayServer } from "../lib/rainbowRelayServer";
import {ServiceType} from "../lib/service";
const logger = makeLogger("RainbowService", "Commands");

interface ParsedCommands {
  port: string;
}
const getServiceType = (service: string): ServiceType => {
 switch(service) {
  case "eth2near":
    return service
  case "near2eth":
    return service
  default:
    throw new Error("Wrong service type choose one of eth2near or near2eth")
 }
}
const parseCommands = async (prog: Command) => {
  let port = "7755";
  if (prog.port) { port = prog.port; }
  const serviceType = getServiceType(prog.service)
  
  return { port, serviceType };
};


/**
 * startRainbowRelayServer from CLI
 * @param program - are the commandline arguments
 */
export const startRainbowRelayServiceFromCLI = async (program: any): Promise<void> => {
  const commands = await parseCommands(program);
  const server = new RainbowRelayServer(commands)
  server.start() 
};
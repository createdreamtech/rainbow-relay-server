import fs from "fs-extra";
import _ from "lodash";
import { makeLogger } from "../lib/logging";
import { Command } from "commander";
import { RainbowRelayServer } from "../lib/rainbowRelayServer";
import {ServiceType} from "../lib/service";
const {RainbowConfig} = require('rainbow-bridge-lib/config');
import Ajv from "ajv";
const ajv = new Ajv();
import rainbowConfigSchema from "../lib/rainbow_relay_config_schema.json";

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
  let configPath = "~/.rainbow";
  if (prog.port) { port = prog.port; }
  if(prog.configPath) {configPath = prog.configPath}
  const configObject = checkRainbowConfig(configPath)
  updateRainbowConfig(configObject)

  const serviceType = getServiceType(prog.service)
  
  return { port, serviceType };
};

export const checkRainbowConfig = (path: string) => {

    const configObj = fs.readJSONSync(path)
    ajv.validate(rainbowConfigSchema, configObj);
    if (ajv.errors && ajv.errors.length > 0) {
      logger.error(`${JSON.stringify(ajv.errors)}`);
      throw new Error(`Bad config`);
    }
    return configObj
}

export const updateRainbowConfig = (cfg: any) => {
  Object.keys(cfg).forEach((key)=>{
    if(key === "$schema") 
      return;
    RainbowConfig.setParam(key, cfg[key])
  })
  RainbowConfig.saveConfig()
}

/**
 * startRainbowRelayServer from CLI
 * @param program - are the commandline arguments
 */
export const startRainbowRelayServiceFromCLI = async (program: any): Promise<void> => {
  const commands = await parseCommands(program);
  const server = new RainbowRelayServer(commands)
  server.start() 
};
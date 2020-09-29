#!/usr/bin/env node
import program from "commander";
const version = require("../../../package.json").version; // tslint:disable-line
import { makeLogger } from "../lib/logging";
import { startRainbowRelayServiceFromCLI } from "./commands";
import _ from "lodash";

const logger = makeLogger("Rainbow Relay Service", "CLI");
program
  .version(version, "-v, --version")
  .option(
    "-p, --port <port>",
    "Set port for rainbow relay service",
    "7755",
  )
  .action(async () => {
    try {
      await startRainbowRelayServiceFromCLI(program);
    } catch (e) {
      logger.error("Could not start rainbow relay server.");
      logger.debug(e.stack);
    }
  })
  .parse(process.argv);

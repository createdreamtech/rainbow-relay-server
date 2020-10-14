import { Router, Server } from "@open-rpc/server-js";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
import { methods } from "../methods";
import cors from "cors";
import { json as jsonParser } from "body-parser";
import { HandleFunction } from "connect";
import {Config} from "./config"

import openRPCDoc from "../../openrpc.json";
import jsonSchemaRefParser from "json-schema-ref-parser";
import { createService } from "./serviceUtil";
const openRPC = openRPCDoc as any;
/**
 * RainbowRelayServer - is the server routing side of the rainbow relay proxy 
 * It instantiates the rainbow relay  proxy 
 */
export class RainbowRelayServer {

  public config: Config;

  constructor(config: Config) {
    this.config = config
  }

  /**
   * start - Launches rainbow relay
   */
  public async start() {
    const {port,serviceType} = this.config;
    const service = createService(serviceType);
    const methodMapping = methods(service);
    const derefOpenRPCDoc = await jsonSchemaRefParser.dereference(openRPC) as OpenrpcDocument;
    const router = new Router(derefOpenRPCDoc, methodMapping);
    const options = {
      methodMapping,
      openrpcDocument: derefOpenRPCDoc,
      router,
      transportConfigs: this.setupTransport(port),
    };
    const server = new Server(options);
    server.start();
  }

  public async stop() {
  }

  private setupTransport(port: string = "8557"): any {
    const corsOptions = { origin: "*" } as cors.CorsOptions;
    return [{
      type: "HTTPTransport", options: {
        middleware: [
          cors(corsOptions) as HandleFunction,
          jsonParser(),
        ],
        port,
      },
    },
    ];
  }

}
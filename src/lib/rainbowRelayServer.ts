import { Router, Server } from "@open-rpc/server-js";
import { OpenrpcDocument } from "@open-rpc/meta-schema";
import { methods } from "../methods";
import cors from "cors";
import { json as jsonParser } from "body-parser";
import { HandleFunction } from "connect";

import openRPCDoc from "../../openrpc.json";
import jsonSchemaRefParser from "json-schema-ref-parser";
const openRPC = openRPCDoc as any;
/**
 * RainbowRelayServer - is the server routing side of the rainbow relay proxy 
 * It instantiates the rainbow relay  proxy 
 */
export class RainbowRelayServer {

  public port: string;

  constructor(port: string) {
    this.port = port;
  }

  /**
   * start - Launches rainbow relay
   */
  public async start() {
    const methodMapping = methods();
    const derefOpenRPCDoc = await jsonSchemaRefParser.dereference(openRPC) as OpenrpcDocument;
    const router = new Router(derefOpenRPCDoc, methodMapping);
    const options = {
      methodMapping,
      openrpcDocument: derefOpenRPCDoc,
      router,
      transportConfigs: this.setupTransport(this.port),
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
/**
 * This handles the routing for the RPC server, exposing the methods that the server handles
 */
import { makeLogger } from "../lib/logging";
import { MethodMapping } from "@open-rpc/server-js/build/router";
import * as types from "../generated-types";
import { Service } from "../lib/service";

const logger = makeLogger("RainbowRelayService", "Methods");

export interface RainbowRelayServiceMethodMapping extends MethodMapping {
    status: types.Status,
    start: types.Start,
    stop: types.Stop,
    config: () => any,
}


export const methods = (service: Service): RainbowRelayServiceMethodMapping => {
    return {
        start: async () =>{
            return service.start()
        },
        stop: async () => {
            return service.stop()
        },
        status: async () => {
            return service.status()
        },
        config: async() => {

        }

    }
}
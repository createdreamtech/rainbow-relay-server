/**
 * This handles the routing for the RPC server, exposing the methods that the server handles
 */
import { makeLogger } from "../lib/logging";
import { MethodMapping } from "@open-rpc/server-js/build/router";
import * as types from "../generated-types";

const logger = makeLogger("RainbowRelayService", "Methods");

export interface RainbowRelayServiceMethodMapping extends MethodMapping {
    logs: types.Logs
    status: types.Status,
    start: types.Start,
    stop: types.Stop,
}


export const methods = (): RainbowRelayServiceMethodMapping => {
return {
    logs: async (timestamp) => {
        return [""]
    },
    start: async () =>{
        return {} 
    },
    stop: async () => {
        return {} 
    },
    status: async () => {
        return  []
    }

}
}
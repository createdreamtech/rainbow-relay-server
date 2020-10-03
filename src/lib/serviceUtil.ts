import { Eth2NearRelay } from "./eth2near"
import { Eth2NearService } from "./eth2near_service"
import { Near2EthRelay } from "./near2eth"
import { Near2EthService } from "./near2eth_service"
import {Service, ServiceType} from "./service"

export function createService(service: ServiceType): Service{
  switch(service){
      case "eth2near": {
        return new Eth2NearService(new Eth2NearRelay()) 
      }
      case "near2eth": {
          return new Near2EthService(new Near2EthRelay())
      }
  }
}
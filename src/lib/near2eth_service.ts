import { Service, ServiceStatus } from "./service"
import { Near2EthRelay} from "./near2eth"

export class Near2EthService implements Service {
    public relay: Near2EthRelay;
    public serviceStatus: ServiceStatus;

    constructor(relay: Near2EthRelay) {
        this.relay = relay;
        this.serviceStatus = "uninitialized";
    }

    public async init() {
        await this.relay.initialize()
        this.serviceStatus = "initialized";
        console.log('Starting eth2near-relay...')
        await this.relay.run()
        this.serviceStatus = "running"
        return this.serviceStatus;
    }

    public async start() {
        if (this.relay.start()) {
            this.serviceStatus = "running"
        }
        return this.serviceStatus;
    }

    public async stop(){
        if (this.relay.stop()) {
            this.serviceStatus = "stopped";
        }
        return this.serviceStatus;
    }

    public async status(){
        return this.serviceStatus;
    }

    public async config() {
        return 
    }


}
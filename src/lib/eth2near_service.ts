import { Service, ServiceStatus } from "./service"
import { Eth2NearRelay } from "./eth2near"
const nearlib = require('near-api-js')
const { EthOnNearClientContract } = require('rainbow-bridge-lib/eth-on-near-client')
const { RainbowConfig } = require('rainbow-bridge-lib/config')
import path from 'path';
import os from 'os';

export class Eth2NearService implements Service {
    public relay: Eth2NearRelay;
    public serviceStatus: ServiceStatus;

    constructor(service: Eth2NearRelay) {
        this.relay = new Eth2NearRelay();
        this.serviceStatus = "uninitialized";
    }

    public async init() {
        const masterAccount = RainbowConfig.getParam('near-master-account')
        const masterSk = RainbowConfig.getParam('near-master-sk')
        const keyStore = new nearlib.keyStores.InMemoryKeyStore()
        await keyStore.setKey(
            RainbowConfig.getParam('near-network-id'),
            masterAccount,
            nearlib.KeyPair.fromString(masterSk)
        )
        const near = await nearlib.connect({
            nodeUrl: RainbowConfig.getParam('near-node-url'),
            networkId: RainbowConfig.getParam('near-network-id'),
            masterAccount: masterAccount,
            deps: {
                keyStore: keyStore,
            },
        })

        const relay = new Eth2NearRelay()
        const clientContract = new EthOnNearClientContract(
            new nearlib.Account(near.connection, masterAccount),
            RainbowConfig.getParam('near-client-account')
        )
        await clientContract.accessKeyInit()
        console.log('Initializing eth2near-relay...')
        this.relay.initialize(clientContract,RainbowConfig.getParam('eth-node-url'))
        this.serviceStatus = "initialized";
        console.log('Starting eth2near-relay...')
        await relay.run()
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
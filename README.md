##TODO

# rainbow-relay-server
> Run the NEAR rainbow bridge relayer as a service 

This program servicizes the rainbow bridge relayer. It makes it possible to stop/start the relayer process as well as retrieve status, check logs, and set some minor configuration changes. The goal here is to create the building blocks for future more advanced behavior. By servicizing the relayer it makes it easier for projects that are relaying data to get information about their relayers in a variety of context. One interesting context worht exploring is shutting down the relayer when the cost of relaying txs is too high. Making the relayer controlable via API means that you can completely decouple the control logic from the relaying process.

[core-geth](https://github.com/etclabscore/core-geth)
## Setup Environment Variables
```sh
export =xxx
```

## Install

```sh
> git clone https://github.com/etclabscore/ancient-store-storj.git
> cd ancient-store-storj
> go build .
> ./ancient-store-storj --help
```

## Run rainbow-relay-server
```
./rainbow-relay-server --port 7755
```

## API Documentation exploration
```
npm run start
open http://playground.open-rpc.org?url=http://localhost:7755
```


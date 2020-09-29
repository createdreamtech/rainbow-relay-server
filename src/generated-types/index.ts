export type StringDoaGddGA = string;
export interface RelayerStatus {
  name?: StringDoaGddGA;
  [k: string]: any;
}
export type RelayerStatuses = RelayerStatus[];
export type Timestamp = number;
/**
 *
 * The type for a relayer
 *
 */
export type RelayerType = "eth2near" | "near2eth";
export type LogData = StringDoaGddGA[];
export interface StatusData {
  services?: RelayerStatuses;
  [k: string]: any;
}
/**
 *
 * Generated! Represents an alias to any of the provided schemas
 *
 */
export type AnyOfTimestampRelayerTypeRelayerTypeLogDataStatusDataRelayerStatusRelayerStatus = Timestamp | RelayerType | LogData | StatusData | RelayerStatus;
export type Logs = (timestamp?: Timestamp) => Promise<LogData>;
export type Status = () => Promise<StatusData>;
export type Start = (relayerType: RelayerType) => Promise<RelayerStatus>;
export type Stop = (relayerType: RelayerType) => Promise<RelayerStatus>;
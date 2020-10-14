export type Name = string;
export type StatusData = "running" | "stopped" | "uninitialized" | "initialized";
export interface ConfigData {
  name?: Name;
  [k: string]: any;
}
/**
 *
 * Generated! Represents an alias to any of the provided schemas
 *
 */
export type AnyOfStatusDataConfigDataStatusDataStatusData = StatusData | ConfigData;
export type Status = () => Promise<StatusData>;
export type Config = () => Promise<ConfigData>;
export type Start = () => Promise<StatusData>;
export type Stop = () => Promise<StatusData>;
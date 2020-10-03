export type ServiceType = "eth2near" | "near2eth";
export interface Service {
    start():Promise<ServiceStatus>
    stop():Promise<ServiceStatus>
    init():Promise<ServiceStatus>
    status():Promise<ServiceStatus>
    config():Promise<any>

}

export type ServiceStatus ="stopped" | "running" | "initialized" | "uninitialized"
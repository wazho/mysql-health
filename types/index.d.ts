import { ConnectionConfig } from 'mysql';
export declare function healthCheckup(connectionUri: string | ConnectionConfig): Promise<{
    isHealthy: boolean;
    error: string | undefined;
}>;

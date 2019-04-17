import { ConnectionConfig, Connection, createConnection } from 'mysql';

export async function healthCheckup(connectionUri: string | ConnectionConfig) {
    let connection: Connection | null = null;
    let isHealthy = false;
    let error: string | undefined;

    try {
        connection = createConnection(connectionUri);
        await new Promise((resolve) => {
            connection!.query('SELECT 1 + 1 AS solution', (err) => {
                isHealthy = !err;
                error = err ? err.sqlMessage : undefined;
                resolve();
            });
        });
    } catch (e) {
        isHealthy = false;
        error = e && e.message;
    } finally {
        connection && connection.end();
    }

    return { isHealthy, error };
}

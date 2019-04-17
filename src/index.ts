import { ConnectionConfig, Connection, createConnection } from 'mysql';

export async function healthCheckup(connectionUri: string | ConnectionConfig) {
    let connection: Connection | null = null;
    let isHealthy = false;
    let error: string | undefined;

    try {
        connection = createConnection(connectionUri);

        error = await new Promise((resolve) => {
            connection!.connect((connectError) => {
                if (connectError) {
                    resolve(connectError.sqlMessage);
                }

                connection!.query('SELECT 1 + 1 AS solution', (queryError) => {
                    if (queryError) {
                        resolve(queryError.sqlMessage);
                    } else {
                        resolve();
                    }
                });
            });
        });

        isHealthy = error === undefined;
    } catch (e) {
        isHealthy = false;
        error = e && e.message;
    } finally {
        connection && connection.end();
    }

    return { isHealthy, error };
}

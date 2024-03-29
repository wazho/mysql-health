"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
async function healthCheckup(connectionUri) {
    let connection = null;
    let isHealthy = false;
    let error;
    try {
        connection = mysql_1.createConnection(connectionUri);
        error = await new Promise((resolve) => {
            connection.connect((connectError) => {
                if (connectError) {
                    resolve(connectError.sqlMessage);
                }
                connection.query('SELECT 1 + 1 AS solution', (queryError) => {
                    if (queryError) {
                        resolve(queryError.sqlMessage);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
        isHealthy = error === undefined;
    }
    catch (e) {
        isHealthy = false;
        error = e && e.message;
    }
    finally {
        connection && connection.end();
    }
    return { isHealthy, error };
}
exports.healthCheckup = healthCheckup;
//# sourceMappingURL=index.js.map
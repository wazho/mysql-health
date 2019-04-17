"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
async function healthCheckup(connectionUri) {
    let connection = null;
    let isHealthy = false;
    let error;
    try {
        connection = mysql_1.createConnection(connectionUri);
        await new Promise((resolve) => {
            connection.query('SELECT 1 + 1 AS solution', (err) => {
                isHealthy = !err;
                error = err ? err.sqlMessage : undefined;
                resolve();
            });
        });
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
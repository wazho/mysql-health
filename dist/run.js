"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
(async () => {
    const { isHealthy, error } = await index_1.healthCheckup({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
    });
    // Successful case:
    //   true undefined
    // Error case:
    //   false 'Client does not support authentication protocol requested by server; consider upgrading MySQL client'
    console.log(isHealthy, error);
})();
//# sourceMappingURL=run.js.map
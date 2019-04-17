"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Node modules.
const commander_1 = __importDefault(require("commander"));
// Local modules.
const index_1 = require("./index");
commander_1.default
    .version(require('../package.json').version)
    .option('-h, --host <value>', 'Host of MySQL')
    .option('-p, --port <n>', 'Port of MySQL', parseInt)
    .option('-u, --user <value>', 'MySQL user to authenticate')
    .option('-P, --password <value>', 'Password of MySQL user')
    .parse(process.argv);
(async () => {
    const { isHealthy, error } = await index_1.healthCheckup({
        host: commander_1.default.host || 'localhost',
        port: commander_1.default.port || 3306,
        user: commander_1.default.user || 'root',
        password: commander_1.default.password || '',
    });
    // Successful case:
    //   true undefined
    // Error case:
    //   false 'Client does not support authentication protocol requested by server; consider upgrading MySQL client'
    console.log(isHealthy, error);
})();
//# sourceMappingURL=run.js.map
// Node modules.
import program from 'commander';
// Local modules.
import { healthCheckup } from './index';

program
    .version(require('../package.json').version)
    .option('-h, --host <value>', 'Host of MySQL')
    .option('-p, --port <n>', 'Port of MySQL', parseInt)
    .option('-u, --user <value>', 'MySQL user to authenticate')
    .option('-P, --password <value>', 'Password of MySQL user')
    .parse(process.argv);

(async () => {
    const { isHealthy, error } = await healthCheckup({
        host: program.host || 'localhost',
        port: program.port || 3306,
        user: program.user || 'root',
        password: program.password || '',
    });

    // Successful case:
    //   true undefined
    // Error case:
    //   false 'Client does not support authentication protocol requested by server; consider upgrading MySQL client'
    console.log(isHealthy, error, program.host);
})();

## Installation

```shell
npm install mysql-health
```

## Usage

### TypeScript

```typescript
import { healthCheckup } from 'mysql-health';

(async () => {
    const { isHealthy, error } = await healthCheckup({
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
```

### Command line

```
npx mysql-health -h <host> -p <port> -u <user> -P <password>
```


# Http Api for Perma-Pin service. 

This is an express router. There is a server.ts for local development, otherwise
you can mount it on your own express server

Published on the Arweave Blockchain in ESM & CommonJs Module Formats: 

`npm install 

```javascript

import { api } from '@perma-pin/http` 
import express from 'express'

const app = express(); 

app.use('/api', api);

app.listen(...)

```
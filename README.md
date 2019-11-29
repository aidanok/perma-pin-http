
# Http Api for Perma-Pin service. 

This is an express router. There is a server.ts for local development, otherwise
you can mount it on your own express server

Published on the Arweave Blockchain in ESM & CommonJs Module Formats: 

`npm install https://qmpiuuuv5t2t.arweave.net/tUG6k4b9xom4syATTW4RBQewoMH6O3BOM1MCf3RPW3k` 

```javascript

import { api } from '@perma-pin/http` 
import express from 'express'

const app = express(); 

app.use('/api', api);

// Mount whatever else you want to serve, like other ipfs tools or static site etc. 

app.listen(...)

```


# Express HTTP API for Perma-Pin. 

This is an express router. There is a server.ts for local development, otherwise
you can mount it on your own express server

Published on the Arweave Blockchain in ESM & CommonJs Module Formats: 

`npm install https://qmpiuuuv5t2t.arweave.net/tUG6k4b9xom4syATTW4RBQewoMH6O3BOM1MCf3RPW3k` 


### Related To

- [https://github.com/aokisok/perma-pin-lib/](https://github.com/aokisok/perma-pin-lib/)
- [https://github.com/aokisok/perma-pin-ui/](https://github.com/aokisok/perma-pin-ui/)


You might just want to visit the public service & api: 

- [https://perma-pin.bloc.space](https://perma-pin.bloc.space)
- [https://perma-pin.bloc.space/api](https://perma-pin.bloc.space/api)



### Dev Usage 

```bash
npm start 
```

`localhost:8080/api` will serve up a swagger UI, giving  a playground and example curl commands for all API methods.

`localhost:8080/api/api.json` will serve up the swagger schema so you can use with the language of your choice. 


You can also start the `perma-pin-ui` project alongside this to use the Perma-Pin UI.


### Production Usage 

```javascript

import { apiRoutes } from '@perma-pin/http'; 
import express from 'express';

const app = express(); 

app.use('/api', apiRoutes);

app.listen()

```

You probably want to deploy it behind SSL, to Lamda, or something similar.
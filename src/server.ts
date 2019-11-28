
import express from 'express';
import { apiRoutes } from './api';

// A basic sever for development & testing purposes.

const port = 8080;

const app = express();

app.get('/', (req, res) => {
  res.send('HI!');
})

app.use('/api', apiRoutes);

// start the Express server
app.listen(port, () => {
  console.log( `server started at http://localhost:${ port }`);
});
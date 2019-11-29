
import express from "express";

// @ts-ignore
import cors from "cors";

// @ts-ignore
import fileUpload from "express-fileupload";

import bodyParser from "body-parser";

import swaggerUi from "swagger-ui-express";

// @ts-ignore
import readYaml from "read-yaml";

import { parseCid, permafiyExisting, checkForPending, getWalletPublicAddress, checkWalletBlance, permaifyManyExisting } from '@perma-pin/lib';

import { handleFormUpload } from "./handle-form-upload";

const swaggerDoc = readYaml.sync(`${__dirname}/swagger.yaml`);

const apiRoutes = express.Router();

apiRoutes.use(cors());
apiRoutes.use(fileUpload());
apiRoutes.use(bodyParser.json());
apiRoutes.use(bodyParser.urlencoded({extended: true}));

// Serve swagger UI API schema document.
apiRoutes.use("/", swaggerUi.serve);
apiRoutes.get("/", swaggerUi.setup(swaggerDoc));
apiRoutes.use('/api.json', (req, res) => res.json(swaggerDoc));
apiRoutes.use('/swagger.json', (req, res) => res.json(swaggerDoc));

apiRoutes.post('/upload', async (req, res) => {
  try { 
    
    if (!(req as any).files) {
      res.status(400);
      res.json({ ok: false, error: 'No files, please use a multipart form upload' });
      return;
    }

    const result = await handleFormUpload((req as any).files);
    if (!result.ok) { res.status(400); }
    res.json(result);

  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ ok: false, error: e.message });
  }
})

// TODO: HANDLE JSON BASE64 ENCODED FILE UPLOAD
apiRoutes.post('/put', (req, res) => {
  
})

// HANDLE CID POST
apiRoutes.post('/pin/:cid', async (req, res) => {
  
  const parsed = parseCid(req.params.cid);
  
  if (!parsed) {
    res.status(400);
    res.json({ error: 'Invalid CID. Must be valid IPFS CID' });
    return;
  }
  
  try { 
    
    const result = await permafiyExisting(req.params.cid);
    
    if (!result.ok) { res.status(400) }
    res.json(result);

  } catch (e) {
    console.error(e);
    console.log(`Returning 500`);
    res.status(500);
    res.json({ ok: false, error: e.message });
  }
})

apiRoutes.post('/pin', async (req, res) => {

  if (!Array.isArray(req.body)) {
    res.status(400);
    res.json({ error: 'Invalid Request, Must be an Array' });
    return;
  }

  if (req.body.length > 20) {
    res.status(400);
    res.json({ error: 'Must be 20 or less CIDs' });
    return;
  }
  
  try { 
    
    const result = await permaifyManyExisting(req.body);
    res.json(result);

  } catch (e) {
    console.error(e);
    console.log(`Returning 500`);
    res.status(500);
    res.json({ ok: false, error: e.message });
  }
})

apiRoutes.get('/checkpending/:id', async (req, res) => {
  try {
    res.header('Cache-Control', 'no-cache');
  
    if (req.params.id.length !== 43) {
      res.status(400); 
      res.json({ok: false, error: 'Invalid Arweave TX ID'})
    }
    
    const status = await checkForPending(req.params.id);
    res.json({ ok: true, status: status })

  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ ok: false, error: e.message });
  }
})

apiRoutes.get('/walletinfo', async (req, res) => {
  try {
    res.header('Cache-Control', 'no-cache');
    const wallet = await getWalletPublicAddress();
    const balance = await checkWalletBlance();
    res.json({ ok: true, wallet, balance })
  } catch (e) {
    console.error(e);
    res.status(500);
    res.json({ ok: false, error: e.message });
  }
})


export { apiRoutes  }


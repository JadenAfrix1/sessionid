import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import qrRouter from './qr.js';
import pairRouter from './pair.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

import('events').then(events => {
    events.EventEmitter.defaultMaxListeners = 500;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use('/qr', qrRouter);
app.use('/code', pairRouter);

app.use('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌌 ᴀᴜʀᴏʀᴀ ʙᴏᴛ is running on port ${PORT}`);
    console.log(`Server: http://0.0.0.0:${PORT}`);
    console.log(`Powered by Mr Afrix Tech`);
});

export default app;

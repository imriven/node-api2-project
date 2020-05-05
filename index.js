


const express = require('express');

const postRoutes = require('./routes');
const server = express();
server.use(express.json())

server.use('/api/posts', postRoutes);


server.listen(8000, () => console.log('API running on port 8000'));
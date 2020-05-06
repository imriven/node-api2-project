


const express = require('express');
const cors = require("cors")
const postRoutes = require('./routes');
const server = express();
server.use(express.json())
server.use(cors())
server.use('/api/posts', postRoutes);


server.listen(8000, () => console.log('API running on port 8000'));
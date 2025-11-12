const express = require('express');
const app = express();
app.use(express.json());

const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

module.exports = app;

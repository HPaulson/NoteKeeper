require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const posts = require('./routes/api/posts');
app.use('/api/posts', posts);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('API Started at ', port));

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const articlesRouter = require('./routes/articles');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/articles', articlesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const express = require('express');
const sequelize = require('./sequelize');
const cors = require('cors');
const articleRouter = require('./routes/articleRouter');
const referenceRouter = require('./routes/referenceRouter');

const app = express();
app.use(express.json({ limit: '15mb' }));

app.use(cors());

const PORT = 3001;

require('./models/article');
require('./models/reference');

articleRouter.use('/article/:articleId/reference', referenceRouter);
app.use('/', articleRouter);



app.listen(process.env.PORT || PORT, async () => {
    console.log(`port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Connection established');
    } catch (e) {
        console.error(e.message);
    }
});
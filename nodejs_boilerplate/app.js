const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const port = process.env.PORT || 3000;
const cors = require('cors');
const busboy = require('connect-busboy')

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(busboy()); 

require('./routes')(router);
app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
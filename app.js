const dotenv = require('dotenv')
dotenv.config();
var express = require('express');
const cors = require('cors');
const yamljs = require('yamljs');   
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const movieApi = require('./controllers/movieController.js');
var app = express();
app.use(cors());
var port = process.env.port || 2000;
var dbConnection = require('./helpers/db');
dbConnection.mongoDBConnection();
const swaggerDocument = yamljs.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// dbConnection.mongoDBConnection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/',movieApi);
// app.get('/',(req,res)=>{
//   res.send(`Server is running at port ${port}`)
// })

app.listen(port);
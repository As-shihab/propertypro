const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());


// listening port ===============
const port = 3000 || process.env.PORT;
app.listen(port , ()=>{
    console.log('server listening successfully on port'  , port)
})


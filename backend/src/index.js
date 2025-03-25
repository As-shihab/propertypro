const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());


// listening port ===============
const prot = 3000 || process.env.PORT;
app.listen(prot , ()=>{
    console.log('server listening successfully')
})


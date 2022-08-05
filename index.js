const connectToMongo = require("./db");
connectToMongo();
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())

app.get('', (req, res)=>{
  res.send('Hello');
});

app.use(express.json());

//Available Routes
app.use('/api/data', require('./routes/data'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
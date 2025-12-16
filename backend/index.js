// importing necessary things for the project
const express = require('express');
const app = express();
const cors = require('cors');
const aiRoutes = require('./Routing/ai.routes');

// Importing dot env to access the data from the .env file
require('dotenv').config();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/Api", aiRoutes);

// Giving a port Where the server will run
const PORT = process.env.PORT || 5000;
//Running the server
app.listen(PORT,()=>{
  console.log(`server is running on port ${PORT}`);
})
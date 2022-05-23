
import http from "http";
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname, join } from 'path';
import express from 'express';

var app = express();
const host = 'localhost';
const port = 8000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(port, function(){
    console.log('Listening on port ' + port)
 })

 /*
 app.post('/handle', (req, res) => {
   res.sendFile(path.join(__dirname, "./playerScorePage/result.html"))
 });
 */

 app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "startPage.html"))
 });

 app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "tutorial.html"))
 });
 
app.use(express.static('.'));
const express = require('express');
const {json, urlencoded} = require('body-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const offerList = [];
const answerList = [];

const app = express();

app.use(json());
app.use(cors());

app.get('/',(request, response)=>{
    response.sendStatus(200);
});
app.post('/',(request, response)=>{
    console.log(request.body);
    response.sendStatus(200);
});
app.post('/createRequest/',(request, response)=>{
    offerList.push(request.body);
    console.log(offerList.length);
    response.sendStatus(200);
});
app.post('/join/:id',(request, response)=>{
    response.json(offerList[request.params.id]);
});
app.post('/answer',(request, response)=>{
    answerList.push(request.body);
    console.log(answerList.length);
    response.sendStatus(200);
});
app.get('/connect',(request, response)=>{
    response.json(answerList[answerList.length-1]);
});
module.exports = app;
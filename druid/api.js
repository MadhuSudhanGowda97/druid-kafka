const request = require('request');
const express = require('express');
const app = express();
const port = 2025;
const druidUrl = 'http://localhost:8888/druid/indexer/v1/supervisor';
const sqlqueryUrl = 'http://localhost:8888/druid/v2/sql';
const nativequeryUrl = 'http://localhost:8888/druid/v2/?pretty';

 app.use(express.json());

app.post('/create', (req, res) => {
    try{
        const ingestionSpec = req.body;
  request.post({
    url: druidUrl,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(ingestionSpec)
  }, (error, response) => {
    res.status(200).send(response);
  });
    }
    catch(error){
        res.send(error)
    }
  
});

app.post('/query', (req, res) => {
    try{
        const query = req.body;
  request.post({
    url: sqlqueryUrl,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(query)
  }, (error, response, body) => {
      const parsedBody = JSON.parse(body);
      res.status(200).send(parsedBody);
    })
    }

   catch (error) {
      res.send(error);
    }
  });

app.post('/nativequery', (req, res) => {
    try {
    const nquery = req.body;
  request.post({
    url: nativequeryUrl,
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(nquery)
  }, (error, response, body) => {
      const parsedBody = JSON.parse(body);
      res.status(200).send(parsedBody);
    }
)}
     catch (error) {
      res.send(error);
    }
  
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

export {
  request,
  app
}
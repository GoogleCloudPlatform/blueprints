const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const fs = require('fs');
const path = require('path');
const {diagram, diagramComplex, diagramPublic, revisions} = require('./diagram');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pino);
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});


// List/Search Diagrams
app.get('/api/v1/diagrams', (req, res) => {
  console.log('req.query', req.query);

  const _diagram = {...diagram};
  delete _diagram.svg;
  const _diagramComplex = {...diagramComplex};
  delete _diagramComplex.svg;
  const _diagramPublic = {...diagramPublic};
  delete _diagramPublic.svg;

  // res.status(403).send();

  setTimeout(() => {
    res.send(JSON.stringify({
      // diagrams: []
      diagrams: [_diagram, _diagramComplex, _diagram, _diagramComplex, _diagram, _diagramPublic]
    }));
  }, 200);
});


// Get Diagram
app.get('/api/v1/diagrams/:id', (req, res) => {
  setTimeout(() => {
    // res.status(403).send();
    res.send(JSON.stringify(diagram));
  }, 1000);
});


// Get Diagram Revisions
app.get('/api/v1/diagrams/:id/revisions', (req, res) => {
  setTimeout(() => {
    // res.status(403).send();
    res.send(JSON.stringify(revisions));
  }, 1000);
});


// Create Diagram
app.post('/api/v1/diagrams', (req, res) => {
  setTimeout(() => {
    console.dir(req.body);
    // res.status(403).send();
    res.send(JSON.stringify(diagram));
  }, 1500);
});


// Update Diagram
app.put('/api/v1/diagrams/:id', (req, res) => {
  // let _diagram = Object.assign(diagram, {title: 'short'});
  setTimeout(() => {
    console.dir(req.body);
    res.send(JSON.stringify(diagram));
    // res.send(JSON.stringify(_diagram));
    // res.status(403).send();
  }, 1500);
});


// Delete Diagram
app.delete('/api/v1/diagrams/:id', (req, res) => {
  // res.status(403).send();
  res.send(JSON.stringify(diagram));
});


// Draw
app.post('/render/svg', (req, res) => {
  setTimeout(() => {
    console.log('req.body.code', req.body.code);
    const svg = (req.body.code.includes('Event Processing'))
                ? diagramComplex.svg
                : diagram.svg;
    // res.status(403).send(JSON.stringify({error: "This is just for testing"}));
    res.send(JSON.stringify({svg}));
  }, 1000);
});


// Export to Slide
app.post('/render/slide', (req, res) => {
  setTimeout(() => {
      const name = req.query.name || 'World';
      const result = {
        previewUrl: "https://docs.google.com/presentation/d/1Wjg_gMv_QFwK0KJe2ksHACmu0MQSuPWNDu7Zqqdi98I/export/svg?pageid=slide_1566794663833992511",
        editUrl: "https://docs.google.com/presentation/d/1nm6FaZgfi2QY4DYX3OByTF4MApJWqfb1HYWpn6Q3Coc/edit#slide=id.slide_1566421494356725173",
        title: '[gcpdraw] 2019-08-26 09:00:00 JST'
      };
      res.send(JSON.stringify(result));
  }, 1000);
});


// Community Icons
app.get('/api/v1/community_icons', (req, res) => {
  const icn = (name, linkUrl, displayUrl) => (
      {name, linkUrl, displayUrl}
  );

  const iconsex = [
      icn('Home', 'https://drive.google.com/file/d/1ZiPSBvgyB8MO_m_QVU87Gu5zOTEnjb8T/view', 'https://drive.google.com/a/google.com/uc?id=1ZiPSBvgyB8MO_m_QVU87Gu5zOTEnjb8T'),
      icn('dog', 'https://drive.google.com/file/d/1--be_NS4gHW2Faynl7hHLXoZUCT0g-Yr/view', 'https://drive.google.com/a/google.com/uc?id=1--be_NS4gHW2Faynl7hHLXoZUCT0g-Yr'),
      icn('android','https://drive.google.com/file/d/1Ww_nXKK1gBFNb8sFYPsqD5kiRT1ANTRu/view', 'https://drive.google.com/a/google.com/uc?id=1Ww_nXKK1gBFNb8sFYPsqD5kiRT1ANTRu'),
  ];

  setTimeout(() => {
    // res.status(403).send(JSON.stringify({error: "This is just for testing"}));
    res.send(JSON.stringify({icons:iconsex}));
  }, 1000);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

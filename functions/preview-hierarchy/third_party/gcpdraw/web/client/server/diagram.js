const fs = require('fs');
const path = require('path');
const {code, codeComplex} = require('./code');

const filePath = path.join(__dirname, 'svg-dummy.xml');
const svg = fs.readFileSync(filePath, {encoding: "utf-8"});

const filePathComplex = path.join(__dirname, 'svg-dummy-complex.xml');
const svgComplex = fs.readFileSync(filePathComplex, {encoding: "utf-8"});

const diagram = {
  id: 'abc-123-def-456',
  permission: 'PRIVATE',
  title: 'Serverless Architecture: Super Lengthy Title Here',
  // title: 'Serverless Architecture',
  ownername: 'furuyama',
  code: code,
  svg: svg,
  createdAt: '2019-09-13T08:00:00+00:00',
  updatedAt: '2019-09-13T08:00:00+00:00',
  revisionId: 'b77e8edf',
};

const diagramComplex = {
  id: 'abc-456-def-789',
  permission: 'UNLISTED',
  title: 'Event Processing',
  ownername: 'furuyama',
  code: codeComplex,
  svg: svgComplex,
  createdAt: '2019-09-13T08:00:00+00:00',
  updatedAt: '2019-09-13T08:00:00+00:00',
  revisionId: 'b77e8edf',
};

const diagramPublic = {
  id: 'abc-123-def-000',
  permission: 'PUBLIC',
  title: 'Serverless Architecture (Public)',
  ownername: 'furuyama',
  code: code,
  svg: svg,
  createdAt: '2019-09-13T08:00:00+00:00',
  updatedAt: '2019-09-13T08:00:00+00:00',
  revisionId: 'b77e8edf',
};

const revisions = {
  revisions: [{
    code: 'revision 1 ' + code,
    revisionId: 'b59e8edf',
    revisionAt: '2020-06-03T13:28:08.956347Z'
  },{
    code: 'revision 2 ' + code,
    revisionId: '91e55f9b',
    revisionAt: '2020-06-03T13:28:03.302391Z'
  },{
    code: 'revision 3 ' + code,
    revisionId: '1fbfc645',
    revisionAt: '2020-06-03T13:27:54.461906Z'
  }]
}

module.exports = {
  diagram,
  diagramComplex,
  diagramPublic,
  revisions
};

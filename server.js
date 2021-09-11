const express = require('express');
const app = express();

app.use(express.static('./dist/full-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/full-app/'}),
);

app.listen(8080);
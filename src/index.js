const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const PORT = 33333

app.use(cors({
    // origin: 'http://meuapp.com' // quando colocar em produção
}));
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => res.send({ message: `API listening in port ${PORT}` }) )

app.use('*', (req, res) => res.send({ message: 'API not found' }))

app.listen(PORT, () => {
    console.log(`API listening in port ${PORT}`)
});

module.exports = app;
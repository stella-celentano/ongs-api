const express = require('express');
const cors = require('cors');

const app = express();

const PORT = 3333

const OngsRoutes = require('./routes/ongs.routes');
const SuppliesRoutes = require('./routes/supplies.routes');
const AnimalsRoutes = require('./routes/animals.routes');

app.use(cors({
    // origin: 'http://meuapp.com' // quando colocar em produção
}));
app.use(express.json());

app.get('/', (req, res) => res.send({ message: `API listening in port ${PORT}` }))

app.use('/ongs', OngsRoutes);
app.use('/animals', AnimalsRoutes);
app.use('/supplies', SuppliesRoutes);

app.use('*', (req, res) => res.send({ message: 'API not found' }))

app.listen(PORT, () => {
    console.log(`API listening in port ${PORT}`)
});

module.exports = app;
import express from 'express'
import cryptoRouter from './routes.js'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { updateDataPeriodically } from './controllers.js'
import cors from 'cors';
const app = express()
const port = 3000


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
updateDataPeriodically();

app.use('/crypto', cryptoRouter);
app.get('/', (req, res) => {
    res.send("Hello World");
});
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server running on port: ${port}`)))
    .catch((error) => console.log(error.message))


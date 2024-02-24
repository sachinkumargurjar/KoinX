import express from 'express'
import {getCryptoInfo, getConvertedPrice, getCompanies} from './controllers.js'

const cryptoRouter = express.Router();

cryptoRouter.get('/', getCryptoInfo);
cryptoRouter.post('/convert', getConvertedPrice);
cryptoRouter.post('/companies', getCompanies);
export default cryptoRouter;
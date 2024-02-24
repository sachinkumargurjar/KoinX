import dotenv from 'dotenv'
import axios from 'axios';
import Coins from './models/coins.js'
dotenv.config();


// const URL = `https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=${process.env.API_KEY}`
//PART-1
export const getCryptoInfo = async (req, res) => {
    try {
        const url = `https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=${process.env.API_KEY}`
        const response = await axios.get(url);
        await Coins.insertMany(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
}
//PART-2
export const getConvertedPrice = async (req, res) => {
    try {
        const {fromCurrency, toCurrency, date} = req.body;
        let dte = date.replaceAll("^\"|\"$", "");
        let url= `https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${dte}?x_cg_demo_api_key=${process.env.API_KEY}`
        const data1 = await axios.get(url);
        const btcPrice1 = data1.data.market_data.current_price.aed;
        url = `https://api.coingecko.com/api/v3/coins/${toCurrency}/history?date=${dte}?x_cg_demo_api_key=${process.env.API_KEY}`
        const data2 = await axios.get(url);
        const btcPrice2 = data2.data.market_data.current_price.aed;
        const convertedPrice = btcPrice1/btcPrice2;
        res.status(200).json(`Converted Price: ${convertedPrice} ${toCurrency}`);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
}
//PART-3
export const getCompanies = async (req, res) => {
    try {
        const {currency} = req.body;
        const url= `https://api.coingecko.com/api/v3/companies/public_treasury/${currency}?x_cg_demo_api_key=${process.env.API_KEY}`
        const response = await axios.get(url);
        res.status(200).json(response.data.companies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
    
}


//PART-1
export const updateDataPeriodically = async(req, res) => {
        setInterval(async () => {
            try {
                const updatedData = await axios.get(URL);
                res.status(200).json(updatedData.data);
            } catch (error) {
                res.status(404).json({ message: error.message });
            }
          }, 1000 * 60 * 60);
}
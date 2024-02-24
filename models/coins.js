import mongoose from 'mongoose';

const coinsSchema = mongoose.Schema({
   id: String,
   symbol: String,
   name: String
});

const Coins = mongoose.model('Coins', coinsSchema);

export default Coins;
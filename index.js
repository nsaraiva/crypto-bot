const axios = require('axios');

const SYMBOL = "BTCUSDT";
const API_URL_PREFIX = "https://testnet.binance.vision";

const BUY_PRICE = 95364;
const SELL_PRICE = 96366;

let isOpened = false;

async function start(){
    const {data} = await axios.get(`${API_URL_PREFIX}/api/v3/klines?limit=21&interval=15m&symbol=${SYMBOL}`);
    const candleStick = data[data.length - 1];
    const price = parseFloat(candleStick[4]);

    // Bot commands
    console.clear();
    console.log(`Current price: ${price}`);

    if(price <= BUY_PRICE && isOpened === false){
        console.log("Buy");
        isOpened = true;
    } else if(price >= SELL_PRICE && isOpened === true){
        console.log("Sell");
        isOpened = false;
    } else {
        console.log("Hold");
    }
}

setInterval(start, 3000);

start();
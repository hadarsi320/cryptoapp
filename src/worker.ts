import config from 'config';
import getUserSymbolModel from "./models/user-symbol/factory";
import getSymbolValueModel from "./models/symbol-value/factory";
import axios from "axios";
import cheerio from "cheerio";
import { io } from "socket.io-client";

const host = config.get<string>('worker.io.host')
const port = config.get<string>('worker.io.port')
const socket = io(`ws://${host}:${port}`)

async function scrape(symbol: string) {
    console.log(`scraping ${symbol}`);

    const response = await axios(`https://www.google.com/finance/quote/${symbol}-USD`)
    const $ = cheerio.load(response.data)
    const value = Number($('.YMlKec.fxKbKc').text().replace(',', ''));

    await getSymbolValueModel().add({
        symbol,
        value,
        when: new Date(),
    })

    await socket.emit('update from worker', {
        symbol, 
        value
    })
    
    return value;
}


async function work() {
    try {
        const symbols = await getUserSymbolModel().getUniqueSymbols();
        const results = await Promise.allSettled(symbols.map(scrape));
        console.log(results);
        
    } catch (error) {
        console.log(error)
    } finally {
        setTimeout(work, config.get<Number>('worker.interval'))
    }
}


(async () => {  
    work();
})();
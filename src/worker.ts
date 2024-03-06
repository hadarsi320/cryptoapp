import mysql from "mysql2";
import util from 'util';
import config from 'config';
import mongoose from "mongoose";
import getUserSymbolModel from "./models/user-symbol/factory";
import getSymbolValueModel from "./models/symbol-value/factory";
import axios from "axios";
import cheerio from "cheerio";


// connect to sql
const connection = mysql.createConnection(config.get('mysql'));
const connect = util.promisify(connection.connect).bind(connection);
const query = util.promisify(connection.query).bind(connection);

// connect mongo
const host = config.get<string>('mongo.host');
const port = config.get<number>('mongo.port');
const database = config.get<string>('mongo.database');


// scrape function:
// fetch from google
async function scrape(symbol: string) {
    console.log(`scraping ${symbol}`);

    // fetch data from google
    const response = await axios(`https://www.google.com/finance/quote/${symbol}-USD`)
    const $ = cheerio.load(response.data)
    const value = Number($('.YMlKec.fxKbKc').text().replace(',', ''));

    // save in mongo
    await getSymbolValueModel().add({
        symbol,
        value,
        when: new Date(),
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
    await Promise.all([
        connect(),
        mongoose.connect(`mongodb://${host}:${port}/${database}`)
    ])
    console.log('Connected to databases, starting...');
    
    work();
})();
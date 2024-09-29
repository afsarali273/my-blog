import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';


interface Stock {
    company: string;
    high: string;
    low: string;
    lastPrice: string;
    prevClose: string;
    change: string;
    percentGain: string;
}

export interface TimeWiseStockData {
    time: string; // Need to change to IST timezone
    data: Stock[];
}

export interface StockData {
    gainers: TimeWiseStockData[];
    losers: TimeWiseStockData[];
}

const fileName = new Date().toISOString().split('T')[0] + '-stockData.json';

// Scraper function to fetch data from Moneycontrol
async function fetchData(type: 'gainer'| 'loser'): Promise<Stock[]> {
    let url = '';
    if(type === 'gainer'){
        url = 'https://www.moneycontrol.com/stocks/marketstats/nsegainer/index.php';
    }else {
        url = 'https://www.moneycontrol.com/stocks/marketstats/nseloser/index.php';
    }

    // https://www.nseindia.com/market-data/live-equity-market?symbol=NIFTY%2050
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const stockList: Stock[] = [];
        const maxRows = 5;
        // Gainers data (Update the class selectors according to the Moneycontrol page)
        $('.bsr_table> table> tbody>tr').each((i, el) => {

            if(i >= maxRows) return false;  // Exit loop after 5 rows

            const companyName = $(el).find('h3 a').text().trim();
            const high = $(el).find('td').eq(1).text().trim();
            const low = $(el).find('td').eq(2).text().trim();
            const lastPrice = $(el).find('td').eq(3).text().trim();
            const prevClose = $(el).find('td').eq(4).text().trim();
            const change = $(el).find('td').eq(5).text().trim();
            const percentGain = $(el).find('td').eq(6).text().trim();

            const stockData: Stock = {
                company: companyName,
                high,
                low,
                lastPrice,
                prevClose,
                change,
                percentGain
            };

            stockList.push(stockData);

        });

        console.log(stockList);

        return stockList;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    return [];
}

export async function appendData(): Promise<void> {

    const filePath: string = path.join(__dirname, fileName);

    const gainers: Stock[] = await fetchData('gainer');
    const losers: Stock[] = await fetchData('loser');

    // timewise data
    const time = new Date().toLocaleTimeString();
    const timeWiseGainerData: TimeWiseStockData = {
        time,
        data: gainers
    };

    const timeWiseLoserData: TimeWiseStockData = {
        time,
        data: losers
    };

    // Read existing data from the file and append new data
    let stockData: StockData = {
        gainers: [],
        losers: []
    };

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        stockData = JSON.parse(data);
    }

    stockData.gainers.push(timeWiseGainerData);
    stockData.losers.push(timeWiseLoserData);

    saveToFile(stockData);
}

function saveToFile(stockData: StockData): void {
    const filePath: string = path.join(process.cwd()+'/data', fileName);
    fs.writeFileSync(filePath, JSON.stringify(stockData, null, 2));
    console.log(`Data saved to ${fileName}`);
}


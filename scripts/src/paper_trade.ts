import fs from "fs";
import path from "path";
import {StockData} from "./scrape_data";

const fileName = new Date().toISOString().split('T')[0] + '-stockData.json';
const filePath: string = path.join(process.cwd()+'/data', fileName);
async function paper_trade(timeSlot: string): Promise<void> {

    let stockData: StockData = {
        gainers: [],
        losers: []
    };
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf-8');
        stockData = JSON.parse(data);
    }

    const slotData = stockData.gainers.find(slot => slot.time === timeSlot);


    // Get the top 3 gainers
    const topStocks = slotData?.data.slice(0, 3);

    // Capital and amount to invest per stock
    const capital = 50000;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const amountPerStock = capital / topStocks?.length;

    console.log(`Performing trade at ${timeSlot}`);
    let profitLoss = 0;

    // Buy at 9: 30 am
    // Sell at 10 am

}

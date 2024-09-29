import {appendData} from "./scrape_data"

async function run(){
    await appendData();
}


run().then(() => console.log("Done"))
    .catch((e) => console.error("Terminated with error: ", e.message || ""));

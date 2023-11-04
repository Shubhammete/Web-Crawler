const {fetchurl} = require('./crawl.js')
const {printReport} = require('./report.js')
// import { fetchurl } from "./crawl.js"
let main = async ()=>{
    if(process.argv < 3){   // process.argv tracks CL arguments first arg is package manager second arg is main.js or entrypoint file name and third argument is website we pass
        console.log("No Website Provided")
        process.exit(1)   // exists with error code 1
    } 
    if(process.argv < 3){   // inputs more than 2 url
        console.log("Two many urls")
        process.exit(1)
    }
    const baseURL = process.argv[2]  // 2nd arugment that is our url
    console.log(`starting crawl ${baseURL}`) 
    const pages = await fetchurl(baseURL,baseURL,{}) 
    // for(const page of Object.entries(pages)){
    //     console.log(page)
    // }
    printReport(pages)
}
main()
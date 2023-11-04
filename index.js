 const {fetchurl} = require('./crawl.js')
// import { fetchurl } from "./crawl.js"
let main = ()=>{
    if(process.argv < 3){
        console.log("No Website Provided")
        process.exit(1)
    }
    if(process.argv < 3){
        console.log("Two many urls")
        process.exit(1)
    }
    const baseURL = process.argv[2]
    console.log(`starting crawl ${baseURL}`) 
    fetchurl(baseURL)
}
main()
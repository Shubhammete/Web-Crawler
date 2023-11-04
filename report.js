let printReport = (pages)=>{
    console.log("===============")
    console.log("REPORT")
    console.log("===============")
    const sortp = sortPages(pages)
    for(const irr of sortp){
        const url = irr[0]
        const hits = irr[1]
        console.log(`the ${url} has total ${hits} hits in webpage`)
    }
    console.log("===============")
    console.log("END REPORT")
    console.log("===============")
}

let sortPages = (pages)=>{
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b)=>{
        aHits = a[1]
        bHits = b[1]
        return b[1]-a[1]
    })
    return pagesArr
}

module.exports = {
    sortPages,
    printReport
}
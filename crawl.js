const {JSDOM} = require('jsdom')


let fetchurl = async (baseurl,suburl,pages)=>{
    console.log(`actively crawl of ${suburl}`)

    // to check suburl is part of baseurl as we dont have to crawl external pages
    const baseurlObj = new URL(baseurl);
    const suburlObj = new URL(suburl)
    if(baseurlObj.hostname !== suburlObj.hostname){
        return pages
    }

    // to keep track of count of specific url being used in page
    const normalizedsubURL = normalizeURL(suburl)
    if(pages[normalizedsubURL]>0){
        pages[normalizedsubURL]++
        return pages
    }
    pages[normalizedsubURL] = 1

    // fetches url
    try{
        const res = await fetch(suburl)   
        if(res.status >399){   // checks for error codes
            console.log(`error in fetch with status code ${res.status} on page ${suburl}`)
            return pages
        }
        //check content-type for response
        if(!res.headers.get('content-type').includes('text/html')){ // dont use res.headers.get('content-type') !== 'text/html' as other string s can be include like charset="utf-8"
            console.log(`non HTML response of ${suburl} content-type ${res.headers.get('content-type')}`)
            return pages
        }
        let data = await res.text()  // formats data in in html form
        const nextURLs = getURLFromHTML(data,baseurl)  // getting links from baseurl
        // iterating over links returned by nextURLs 
        for(const nextURL of nextURLs){
            // calling function recursively until two base conditions met
            pages = await fetchurl(baseurl,nextURL,pages) 
        }
        
    }
    catch(err){  // catches error
            console.log(`error in fetching ${suburl} , error message : ${err.message}`)
        }
        return pages
}


let getURLFromHTML = (HTMLBody,baseURL) =>{
    const urls = []
    let dom = new JSDOM(HTMLBody)  // created JSDOM object and passed HTML code in it
    let links = dom.window.document.querySelectorAll('a')  // selects all anchor tags in given HTML 
    for(const link of links){   // iterate through all anchor tags
        if(link.href.slice(0,1) === '/'){   // checks if link is relative
            // check if url is valid or not
            try{                    
                link.href = `${baseURL}${link.href}`  // add base url to complete it
                let urlObj = new URL(link.href)  // checks url is valid or not
                urls.push(urlObj.href)      // push href value to urls array
            }catch(err){
                console.log(`Error in relative URL: ${err.message}`)   // return error message
            }
            
        }else{
            try{
                let urlObj = new URL(link.href)   // checks url is valid or not
                urls.push(urlObj.href)          // push href value to urls array
            }catch(err){
                console.log(`Error in absolute URL: ${err.message}`)   // return error message
            }
        }
        
    }
    
    return urls
}

let normalizeURL = (urlString)=>{
    let urlObj = new URL(urlString);  // this already converts string into lower case
    let path = `${urlObj.hostname}${urlObj.pathname}`  // return host name and path name without protocol
    if(path.length > 0 && path.slice(-1)==='/'){  // checks for / at the end of url
        return path.slice(0,-1);   // return string expect last char
    } 
    return path
}
// export module to make function available to other files or modules
module.exports={
    normalizeURL,
    getURLFromHTML,
    fetchurl
}
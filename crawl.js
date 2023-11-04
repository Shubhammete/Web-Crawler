const {JSDOM} = require('jsdom')

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
    getURLFromHTML
}
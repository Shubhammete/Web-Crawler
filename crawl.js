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
    normalizeURL
}
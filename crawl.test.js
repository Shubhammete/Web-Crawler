const {normalizeURL,getURLFromHTML} = require('./crawl.js')
const {test,expect} = require('@jest/globals')
//test cases
test("Checking last / in url",()=>{   // test function has two params testname and function
    const input = 'https://test.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'test.dev/path'
    expect(actual).toEqual(expected)  // checks the test
})

test("Normalize the Captital letters",()=>{
    const input = 'https://TEST.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'test.dev/path'
    expect(actual).toEqual(expected)
})

test("strips url by removing http",()=>{
    const input = 'https://test.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'test.dev/path'
    expect(actual).toEqual(expected)
})

test("get absolute url from htmlpage",()=>{
    const inputHTML = `<html>
        <body>
            <a href="https://test.dev/path/"></a>        
        </body>
    </html>`
    const inputBaseURL = "https://test.dev"
    const actual = getURLFromHTML(inputHTML,inputBaseURL)
    const expected = ['https://test.dev/path/']
    expect(actual).toEqual(expected)
})

test("get relative url from htmlpage",()=>{
    const inputHTML = `<html>
        <body>
            <a href="/path/"></a>        
        </body>
    </html>`
    const inputBaseURL = "https://test.dev"
    const actual = getURLFromHTML(inputHTML,inputBaseURL)
    const expected = ['https://test.dev/path/']
    expect(actual).toEqual(expected)
})

test("get both url from htmlpage",()=>{
    const inputHTML = `<html>
        <body>
        <a href="https://test.dev/path1/"></a>
            <a href="/path2/"></a>
            <a href="invalid"></a>        
        </body>
    </html>`
    const inputBaseURL = "https://test.dev"
    const actual = getURLFromHTML(inputHTML,inputBaseURL)
    const expected = ['https://test.dev/path1/','https://test.dev/path2/']
    expect(actual).toEqual(expected)
})
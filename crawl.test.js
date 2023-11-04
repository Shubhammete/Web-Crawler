const {normalizeURL} = require('./crawl.js')
const {test,expect} = require('@jest/globals')
//test cases
test("Checking last / in url",()=>{   // test function has two params testname and function
    const input = 'https://boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)  // checks the test
})

test("Normalize the Captital letters",()=>{
    const input = 'https://Boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test("strips url by removing http",()=>{
    const input = 'https://Boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})
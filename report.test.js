const {sortPages} = require('./report.js')
const {test,expect} = require('@jest/globals')
//test cases
test("Sorting Pages according to occurance",()=>{   
    const input = {
        "https://test.com":20,
        "https://test2.com":23,
        "https://test3.com":12
                }
    const actual = sortPages(input)
    const expected = [
        
        ["https://test2.com",23],
        ["https://test.com",20],
        ["https://test3.com",12]
    ]
    expect(actual).toEqual(expected) 
})
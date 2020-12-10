'use strict'

const asyncutils = require('./../index')

test('Test parallel with two tasks and check results', done => {
    const t1 = cb => setTimeout(() => cb(null, 'one'), 200)
    const t2 = cb => setTimeout(() => cb(null, 'two'), 100)
    asyncutils.parallel([t1, t2], (err, res) => {
        expect(err).toBeFalsy()
        expect(res.length).toBe(2)
        expect(res[0]).toBe('one')
        expect(res[1]).toBe('two')
        done()
    })
})
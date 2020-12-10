'use strict'

/**
 * @param {Array} tasks Each item is an function with a single callback argument 
 * @param {Error, Array} cb 
 */
function parallel(tasks, cb) {
    let failed, count = 0
    const res = []
    tasks.forEach((t, i) => {
        t((err, val) => {
            if(failed) return
            if(err) return cb(failed = err)
            res[i] = val
            count++
            if(count == tasks.length)
                cb(null, res)
        })
    })
}

module.exports = { parallel }
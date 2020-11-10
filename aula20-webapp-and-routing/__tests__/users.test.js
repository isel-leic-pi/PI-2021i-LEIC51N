/* eslint-disable no-undef */
'use strict'

const users = require('./../lib/repo/users')

test('test users module getUsers successfuly', done => {
    users.getUser('gamboa', (err, user) => {
        // Assert that there is no error
        expect(err).toBeFalsy()

        // Assert that property username of user is gamboa
        expect(user.username).toBe('gamboa')
        done()
    })
})
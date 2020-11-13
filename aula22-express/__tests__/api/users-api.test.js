'use strict'

const frisby = require('frisby')
const fork = require('child_process').fork

let server

// eslint-disable-next-line no-undef
afterAll(() => {
    server.kill()
})

// eslint-disable-next-line no-undef
beforeAll(done => {
    server = fork('./index', ['./__tests__/mocks/users.json'])
    server.on('message', msg => {
        if(msg.running)
            done()
    })
})

// eslint-disable-next-line no-undef
test('Test users route to get all users', () => frisby
    .get('http://localhost:8000/vinyl/users')
    .expect('status', 200)
    .expect('json', '[0]', EXPECTED_USERS[0])
    .expect('json', '[1]', EXPECTED_USERS[1])
)

// eslint-disable-next-line no-undef
test('Test users route to get laurinda', () => frisby
    .get('http://localhost:8000/vinyl/users/laurinda')
    .expect('status', 200)
    .expect('json', 'username', 'laurinda')
    .expect('json', 'artists', ['Franz Ferdinand','Faith no more'])
)

// eslint-disable-next-line no-undef
test('Test users route for unknown username', () => frisby
    .get('http://localhost:8000/vinyl/users/blabla')
    .expect('status', 404)
)

const EXPECTED_USERS = [
    {
        'username': 'laurinda',
        'artists': [
            'Franz Ferdinand',
            'Faith no more'
        ],
        'details': 'http://localhost:8000/vinyl/users/laurinda',
        'toptracks': 'http://localhost:8000/vinyl/users/laurinda/toptracks'
    },
    {
        'username': 'baptista',
        'artists': [
            'police',
            'james'
        ],
        'details': 'http://localhost:8000/vinyl/users/baptista',
        'toptracks': 'http://localhost:8000/vinyl/users/baptista/toptracks'
    }
]
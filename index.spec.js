const app = require('./index') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

describe('Testing Opareta APY Endpoints', () => {

it('Fetch APY Endpoint successful', async done => {
    // Sends GET Request to /test endpoint
    const response = await request.get('/apy')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
    done()
});

it('Delete APY History successful', async done => {
    // Sends DELETE Request to /test endpoint
    const response = await request.delete('/apy/1')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
    done()
});

});

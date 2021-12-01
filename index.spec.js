const app = require('./index'); // Fetch APIs
const supertest = require('supertest');
const request = supertest(app);

describe('Testing Opareta APY Endpoints', () => {

    test('POST /apy request made successfully', async () => {

        //Mock APY
        let newAPY={
            deposit:100,
            customer_id:1,
            interest_rate:0.5,
            yearly_compound_times:12,
        };
        
        // Sends GET Request to /test endpoint
        const response = await request.post('/apy/').send(newAPY);
        
        expect(response.status).toBe(200);
        //expect(response.body.message).toBe('APY calculated and saved successfully.');

    });

    test('GET /apy History successful', async () => {
        
        // Sends GET Request to /test endpoint
        const response = await request.get(`/apy/1`);
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        //expect(response.body[0]._id).toBe(post.id);
        //expect(response.body[0].title).toBe(post.title);
        //expect(response.body[0].content).toBe(post.content);
        expect(response.body.length).toEqual(1);
        //expect(response.body.send).toBe('pass!');

    });

    test('DELETE /apy History successful', async () => {
        
        // Sends GET Request to /test endpoint
        const response = await request.delete(`/apy/1`);
        
        expect(response.status).toBe(200);
        //expect(response.body.message).toBe('Customer APY History deleted successfully.');

    });

});


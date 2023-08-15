'use strict';
require('dotenv').config();

const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);

describe('Route Not Found', () => {
    it('Route Not Found', async () => {
        const res = await req.get('/something');
        expect(res.status).toEqual(404);
    });
});
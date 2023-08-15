'use strict';

require('dotenv').config();
const { app } = require("../../server");
const supertest = require("supertest");
const req = supertest(app);


describe('server error', () => {
    it('Handle not foound page method', async () => {
        const res = await req.get('/intentionalError');
        expect(res.status).toEqual(500);
        expect(res.body).not.toBeNull();
    });
});
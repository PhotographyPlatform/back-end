const http = require('http');
const startServer = require("../../server"); // Replace with the actual import for your server file
const path = require('path');
describe('Server Startup', () => {
    let server;
    const PORT = 5000; // Replace with the desired port number

    beforeAll(() => {
        server = http.createServer(startServer);
        server.listen(PORT);
    });

    afterAll(() => {
        server.close();
    });

    test('server should start and listen on the specified port', async () => {
        expect(server.listening).toBeTruthy();
    });
});





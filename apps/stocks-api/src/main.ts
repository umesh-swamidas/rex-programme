/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  const httpRequest = require('request');

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      console.log('request.params: ' + request.params);
      console.log('request.path: ' + request.path);
      console.log('request.query: ' + Object.prototype.hasOwnProperty.call(request.query, 'token'));
      /*return {
        hello: 'umesh'
      };*/

      let httpResponse: any = {};
      httpRequest('https://sandbox.iexapis.com/stable/stock/AAPL/chart/1m?token=Tpk_cb788a12066c4676b4a6f74dac0ba44c', (error, response, body) => {
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);
        httpResponse = body;
        //reply.response(body);
        //console.log('HTTP Response:', reply);
        //return reply;
        /*httpResponse = {
          hello: 'umesh'
        };*/
      });

    /* httpRequest('https://sandbox.iexapis.com/stable/stock/AAPL/chart/1m?token=Tpk_cb788a12066c4676b4a6f74dac0ba44c')
        .on('response', function(response) {
          console.log(response.statusCode)
          console.log(response.headers['content-type'])
          httpResponse = response.body;
        });*/
      //console.log('HTTP Response:', reply);
      return httpResponse;
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();

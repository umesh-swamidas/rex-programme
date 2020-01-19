/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import { environment } from './environments/environment';

const axios = require( 'axios' );
const nodeCache = require( 'node-cache' );
const myCache = new nodeCache(3600, 300);

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/beta/stock/{symbol}/chart/{period}',
    handler: async (request, reply) => {
      const symbol: string = request.params.symbol;
      const period: string = request.params.period;
      /*
      * Candidate's comments:
      * The caching mechanism can be further enhanced to check whether the requested data
      * is a subset of data that already exists in the cache. For e.g. if the user requests
      * for data for a time period of 1m and the cache already has data for 5y, the cached
      * data can be returned.
      * */
      const cacheKey = symbol.concat(period);
      const cachedValue = myCache.get(cacheKey);
      if (cachedValue){
        return reply.response(cachedValue);
      } else {
        const url: string = environment.apiURL + request.path.replace('{symbol}', symbol).replace('{period}', period) + '?token=' + environment.apiKey;
        const httpResponse = await axios.get(url)
          .catch((err = new Error()) => {
            return reply.response('Error while fetching data').code(500);
          });
        if(httpResponse && httpResponse.data){
          myCache.set( cacheKey, httpResponse.data, 60 );
        }
        return reply.response(httpResponse.data);
      }
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

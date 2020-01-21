/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import { Server } from 'hapi';
import {cacheConfig, environment, httpConnectionConfig} from './environments/environment';

const axios = require( 'axios' );
const NodeCache = require( 'node-cache' );
const myCache = new NodeCache(cacheConfig.stdTTL, cacheConfig.checkPeriod);

const init = async () => {
  const server = new Server({
    port: 3333,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/{symbol}/chart/{period}',
    handler: async (request, reply) => {
      const symbol: string = request.params.symbol;
      const period: string = request.params.period;
     /*
      * Candidate's comments:
      * The caching mechanism can be further enhanced to check whether the requested data
      * is a subset of data that already exists in the cache. For e.g. if the user requests
      * for data for a time period of 1m and the cache already has data for 5y, the cached
      * data can be returned.
      **/
      const cacheKey = (symbol && period) ? symbol.concat(period) : null;
      const cachedValue = cacheKey ? myCache.get(cacheKey) : null;
      if (cachedValue){
        return reply.response(cachedValue);
      } else {
        const url: string = request.path.replace('{symbol}', symbol).replace('{period}', period);
        /* Creating a request config object so that any extra configuration parameters can be passed. For e.g. request headers,
         * body, authentication, proxy etc.
         **/
        const requestConfig = {
          baseURL: environment.apiURL,
          params: {
            token: environment.apiKey
          },
          timeout: httpConnectionConfig.connectionTimeout
        };
        const httpResponse = await axios.get(url, requestConfig)
        // Exception handling: Returning the error message
          .catch((error: any) => {
            return error.response;
          });
        if(httpResponse && httpResponse.data){
          myCache.set(cacheKey, httpResponse.data, cacheConfig.ttl);
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

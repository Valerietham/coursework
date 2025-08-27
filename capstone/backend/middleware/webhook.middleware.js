import bodyParser from 'body-parser';

export const bodyParserMiddleware = bodyParser.raw({
  type: 'application/json',
});

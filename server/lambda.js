// This lambda.js file will wrap your existing Express application to make it compatible with AWS Lambda.

const serverless = require('serverless-http');
const app = require('./app'); 

module.exports.handler = serverless(app);
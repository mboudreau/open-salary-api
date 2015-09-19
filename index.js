/* global process:true */

'use strict';

var serverFactory = require('./src/server.js');

// if process.env.NODE_ENV has not been set, default to development
//var NODE_ENV = process.env.NODE_ENV || 'development';
var production = false, server;


module.exports.run = run;

function run(){
     server = serverFactory(8000, production).start();
}

run();
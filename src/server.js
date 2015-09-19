/* global process:true */

'use strict';

var cluster = require('cluster'),
    app = require('./app.js'),
    ddb = require('./services/dynamodb');

function Server(port, production) {
    this.port = port || 8000;
    this.production = production || false;
    var pkg = require('../package.json');
    this.server = null;
}

Server.prototype.start = function () {
    // In production environment, create a cluster
    if (this.production) {
        createCluster.call(this);
    } else {
        spawnWorker.call(this);
    }

    function spawnWorker() {
        // create servers
        this.server = app.createServer();

        // start listening
        this.server.listen(this.port, (function () {
            console.info('%s listening at %s', this.server.name, this.server.url);
        }).bind(this));
    }

    function createCluster() {
        // Set up cluster and start servers
        if (cluster.isMaster) {
            var cpus = require('os').cpus().length;

            console.info('Starting master, pid ' + process.pid + ', spawning ' + cpus + ' workers');

            // fork workers
            for (var i = 0; i < cpus; i++) {
                cluster.fork();
            }

            cluster.on('listening', (function (worker) {
                console.info('Worker ' + worker.id + ' started');
            }).bind(this));

            // if a worker dies, respawn
            cluster.on('death', (function (worker) {
                console.warn('Worker ' + worker.id + ' died, restarting...');
                cluster.fork();
            }).bind(this));

        }
        // Worker processes
        else {
            spawnWorker();
        }
    }

    return this;
};

Server.prototype.stop = function stop() {
    if (this.server) {
        if (this.production) {
            cluster.disconnect(this.server.close);
        } else {
            this.server.close()
        }
    }

    return this;
};

module.exports = function (port, production) {
    return new Server(port, production)
};

function ListTables() {
  return ddb.listTables({}, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
  }
  });
}

function ListRecords(tableName) {
    ddb.scan(tableName, {}, function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
    }
 });
}

//ListTables();
//ListRecords('opensalary-data');

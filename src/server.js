/* global process:true */

'use strict';

var cluster = require('cluster'),
    app = require('./app.js'),
    logging = require('./logging.js');

function Server(port, production) {
    this.port = port || 8000;
    this.production = production || false;
    var pkg = require('../package.json');
    this.logger = logging.createLogger({name: pkg.name + '-' + port, dir: 'logs', level: 'debug'});
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
        this.server = app.createServer(this.logger);

        // start listening
        this.server.listen(this.port, (function () {
            this.logger.info('%s listening at %s', this.server.name, this.server.url);
        }).bind(this));
    }

    function createCluster() {
        // Set up cluster and start servers
        if (cluster.isMaster) {
            var cpus = require('os').cpus().length;

            this.logger.info('Starting master, pid ' + process.pid + ', spawning ' + cpus + ' workers');

            // fork workers
            for (var i = 0; i < cpus; i++) {
                cluster.fork();
            }

            cluster.on('listening', (function (worker) {
                this.logger.info('Worker ' + worker.id + ' started');
            }).bind(this));

            // if a worker dies, respawn
            cluster.on('death', (function (worker) {
                this.logger.warn('Worker ' + worker.id + ' died, restarting...');
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

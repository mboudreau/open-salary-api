var elasticsearch = require('elasticsearch'),
    logging = require('./logging');

module.exports = new elasticsearch.Client({
    //host: '10.12.2.174:9200',
    host: '172.16.12.115:9200',
    log: logging
});

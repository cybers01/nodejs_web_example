var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/test';

exports.connect = function() {
    mongoose.connect(dbURI);

    mongoose.connection.on('connected', function() {
        console.log('Succeed to get Connection pool in mongoose, dbURI is ' + dbURI);
    });

    mongoose.connection.on('error', function(err) {
        console.log('Failed to get Connection pool in mongoose, err is ' + err);
    });

    mongoose.connection.on('disconnected', function() {
        console.log('Database connection has disconnected.');
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            console.log('Application process is going down, disconnect database Connection');
            process.exit(0);
        });
    });
};